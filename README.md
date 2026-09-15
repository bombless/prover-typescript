# prover-typescript

A tiny Curry–Howard proof assistant kernel written in TypeScript.

## Milestone 1 — de Bruijn Kernel

Milestone 1 is complete. The trusted core uses one consistent invariant: `Var(index)` is a de Bruijn index, with `#0` referring to the innermost enclosing binder, `#1` to the next outer binder, and so on. Substitution shifts replacements when crossing binders, and beta reduction therefore remains capture-avoiding.

The `Nat.rec` successor case is checked with the same binder convention: inside `((n : Nat) -> P n -> P (Succ n))`, `#0` is the induction hypothesis and `#1` is `n`. `add` recurses on its first argument, so its closed computations satisfy `add 0 3 -> 3`, `add 1 3 -> 4`, and `add 2 3 -> 5` by normalization.

Annotated lambdas are inferable as `Pi` types, which makes the kernel-level contract `infer(add) = Nat -> Nat -> Nat` explicit while preserving kernel checking as the trust boundary.

The current implementation deliberately keeps the trusted core small. It currently contains:

- `Type` and `Nat`
- `Zero` and `Succ`
- de Bruijn-indexed variables
- dependent function types (`Pi`)
- lambda terms and application
- capture-avoiding substitution
- beta reduction and normalization
- `Nat.rec` with iota reduction
- equality propositions (`Eq`), reflexivity (`Refl`), and an initial equality eliminator shape
- kernel `infer` / `check`
- definitional equality
- a small recursive `add` library
- regression tests

The architecture intentionally separates syntax, reduction, type checking, and library definitions. Tactics and surface syntax are not trusted by the kernel and will be added later.

## Milestone 2 — Nat.rec

Milestone 2 is complete. `NatRec(motive, zeroCase, succCase, scrutinee)` keeps this argument order unchanged and uses the dependent eliminator:

```text
Nat.rec :
  (P : Nat -> Type) ->
  P 0 ->
  ((n : Nat) -> P n -> P (Succ n)) ->
  (n : Nat) ->
  P n
```

The successor case is checked as `λn. λih. ...`: inside the nested binders, `#0` is the induction hypothesis and `#1` is `n`. The kernel therefore checks the dependent result `P (Succ n)` rather than treating the recursive step as a special arithmetic operation.

Reduction is fixed by the two iota rules:

```text
Nat.rec P z s 0        -> z
Nat.rec P z s (Succ n) -> s n (Nat.rec P z s n)
```

The regression suite in `tests/kernel/nat-rec.test.ts` covers both rules, concrete recursion, symbolic successor recursion, a genuinely dependent motive, and rejection of the wrong de Bruijn binder reference. Existing `add` behavior and the `add n 0` non-reduction regression remain unchanged.

Implementation decision: no new kernel workaround was needed for Milestone 2. The existing `shift`, capture-avoiding `substitute`, `NatRec` iota reduction, and `NatRec` type checking already implement the intended semantics; this milestone makes those semantics explicit and regression-tested. The npm test glob now includes all files under `tests/kernel` so these regressions cannot be silently skipped.

## Milestone 3 — add

Milestone 3 is complete. `add` is defined by recursion on its first argument:

```text
add 0 m = m
add (Succ n) m = Succ (add n m)
```

Its Core AST is explicitly:

```text
add =
  λn : Nat =>
  λm : Nat =>
    Nat.rec
      (λ_ : Nat => Nat)
      m
      (λn =>
        λih =>
          Succ ih)
      n
```

The motive is `λ_ : Nat => Nat`. In the successor case `λn. λih. Succ ih`, the de Bruijn convention is `#0 = ih` and `#1 = n`, so the body is `Succ(Var(0))`. The library definition therefore matches the general `Nat.rec` semantics rather than receiving any special arithmetic treatment in the kernel.

The kernel verifies `infer(add) = Nat -> Nat -> Nat`, and `check([], add, addType)` succeeds. Concrete normalization is regression-tested for `add 0 3 = 3`, `add 1 3 = 4`, `add 2 3 = 5`, and `add 3 4 = 7`.

The symbolic regression is also explicit: for `n : Nat`, `add n 0` remains a neutral `Nat.rec` computation because the scrutinee `n` is unknown. Therefore it is not definitionally equal to `n`, while `infer(n : Nat, add n 0) = Nat` still succeeds. This behavior is intentionally preserved for the later definitional-equality milestone.

Implementation decision: Milestone 3 required no kernel semantic changes or `add`-specific reduction workaround. The existing beta reduction, capture-avoiding substitution, `Nat.rec` iota rules, normalization, and dependent type checking are sufficient. New coverage lives in `tests/kernel/add.test.ts`, including an exact Core AST regression, type checking, closed computations, and the unknown-variable case.

## Run

```text
npm install
npm test
npm start
```

## Next milestones

1. Milestone 3 — complete (`add` definition and regression coverage);
2. Milestone 4 — lock down definitional equality behavior;
3. Milestone 5 — complete `Eq` / `EqRec`;
4. Milestone 6 — construct the first explicit induction proof term;
5. only then proceed to surface syntax, elaboration, tactics, simplification, polynomial normalization, and `Int`.
