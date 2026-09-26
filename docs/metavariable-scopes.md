# Metavariable scopes

Metavariables belong to the proof engine. They are never Core syntax nodes and
must be resolved before a term is passed to the Kernel.

## Context and assignment rules

`MetaContext.create(scopeDepth, type?)` records the variable's **home scope**.
A scope of depth 2 contains two local bindings, with de Bruijn index 0 naming
the newest binding. Core assignments are always stored in that home scope.
Assignments are single-use; keep an earlier `MetaContext` to explore a different
solution without modifying the current branch.

All scopes within a unification operation must be prefixes of the **same local
context**. Depths alone cannot identify bindings in unrelated sibling contexts.
Callers must not combine metavariables from different context branches merely
because their depths match.

An unresolved alias can point from a deeper home scope to a shallower one. When
the shallower variable is solved, resolution lifts its free indices over the
extra local bindings. For example:

```ts
const outer = MetaContext.empty().create(1, Nat);
const inner = outer.context.create(2, Nat);
const linked = unify(outer.term, inner.term, inner.context);
const solved = unify(inner.term, variable(1), linked);

solved.instantiate(outer.term); // Var 0 in the outer context
solved.instantiate(inner.term); // Var 1 in the inner context
```

Both equation orders produce the same scope constraint. Attempting to solve
`inner.term` with `variable(0)` in this example fails: that newer local binding
is unavailable to the shared outer variable. The failed operation leaves the
input context unchanged.

## Occurrences and ambient scopes

A bare `metaTerm(id)` refers to the variable's home scope. An optional
`metaTerm(id, scopeDepth)` records a root occurrence in an extended prefix
context. This annotation is also returned when an unresolved alias is resolved
from a deeper scope, so subsequent solving does not lose the original context.
The annotation cannot name a scope smaller than the variable's home scope.

- `context.resolve(id)` resolves at that variable's home scope.
- `context.resolveAt(id, scopeDepth)` resolves in an explicitly extended scope.
- `context.instantiate(ref)` respects the reference's occurrence scope.
- `unify(left, right, context, scopeDepth?)` compares in a shared root scope.
- `toCoreTerm(term, context, scopeDepth?)` materializes in that same root scope.

Without an explicit root scope, `unify` and `toCoreTerm` use the greatest
metavariable home or occurrence scope in their input expressions. Core terms
are already interpreted in that common context; they are not automatically
rebased from an inferred smaller context. When additional locals appear only
in Core syntax, pass the ambient depth explicitly:

```ts
const created = MetaContext.empty().create(1, Nat);
const solved = unify(created.term, variable(2), created.context, 3);
toCoreTerm(created.term, solved, 3); // Var 2
solved.instantiate(created.term);   // Var 0
```

Direct `MetaContext.assign` accepts Core values expressed in the destination's
home scope. A direct alias with an explicit occurrence scope must fit inside
that destination scope; use unification for an equation expressed in a larger
ambient context.

## Binders and limits

A metavariable occurrence beneath a syntactic `Pi` or `Lambda` still refers to
its root context. Materialization adds the surrounding binder depth and shifts
only free variables of the stored assignment. Local variables bound inside the
assignment remain unchanged. Substitution therefore preserves a reference's
root scope annotation; surrounding syntax accounts for the additional binders.

The solver deliberately rejects inference of an unresolved metavariable from
inside a binder. Comparing already solved occurrences under binders is
supported. This is a first-order solver, not higher-order unification.

Compound assignments must materialize all nested metavariables before storage.
Unsolved nested references, cyclic aliases, repeated assignments, invalid
indices, and dependencies on removed locals are rejected. Alias chains retain
scope information until they resolve to Core syntax.

The optional `type` field is metadata, not evidence of a checked assignment.
Scope validation and unification do not replace Kernel type checking. Callers
must check the resulting Core proof against its expected type and local
context before treating a goal as proved.
