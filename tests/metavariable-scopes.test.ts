import assert from 'node:assert/strict';
import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { definitionalEqual } from '../src/kernel/reduction';
import { Term, Nat, Type, Zero, app, eq, lambda, pi, refl, variable } from '../src/syntax/ast';
import { MetaContext, coreTerm, metaTerm, rebaseCoreTerm } from '../src/proof/metavariable/meta';
import { substituteUnification, toCoreTerm, uApp, unify } from '../src/proof/unification';

function pair(outerDepth = 1, innerDepth = 2) {
  const outer = MetaContext.empty().create(outerDepth, Nat);
  const inner = outer.context.create(innerDepth, Nat);
  return { outer, inner, context: inner.context };
}

test('a cross-scope alias records its unresolved occurrence scope', () => {
  const { outer, inner, context } = pair();
  const linked = context.assign(inner.variable.id, outer.term);
  assert.deepEqual(linked.resolve(inner.variable.id), metaTerm(outer.variable.id, 2));
  assert.deepEqual(linked.resolve(outer.variable.id), outer.term);
  assert.deepEqual(context.resolve(inner.variable.id), inner.term);
});

test('a solved alias is lifted into the source creation scope', () => {
  const { outer, inner, context } = pair();
  const solved = context.assign(inner.variable.id, outer.term).assign(outer.variable.id, coreTerm(variable(0, 'outer')));
  assert.deepEqual(solved.instantiate(outer.term), variable(0, 'outer'));
  assert.deepEqual(solved.instantiate(inner.term), variable(1, 'outer'));
  assert.deepEqual(solved.resolveAt(inner.variable.id, 4), coreTerm(variable(3, 'outer')));
});

test('alias chains lift by the total scope difference exactly once', () => {
  const { outer, inner, context } = pair();
  const deep = context.create(4, Nat);
  const linked = deep.context.assign(deep.variable.id, inner.term).assign(inner.variable.id, outer.term);
  assert.deepEqual(linked.resolve(deep.variable.id), metaTerm(outer.variable.id, 4));
  const solved = linked.assign(outer.variable.id, coreTerm(lambda(Nat, app(variable(1), variable(0)))));
  assert.deepEqual(solved.instantiate(deep.term), lambda(Nat, app(variable(4), variable(0))));
});

test('unification orients distinct scopes independently of equation order', () => {
  for (const depths of [[0, 1], [1, 2], [2, 5]]) {
    const { outer, inner, context } = pair(...depths);
    for (const [left, right] of [[outer.term, inner.term], [inner.term, outer.term]]) {
      const linked = unify(left, right, context);
      assert.equal(linked.assignment(outer.variable.id), undefined);
      assert.deepEqual(linked.assignment(inner.variable.id), outer.term);
      const solved = unify(inner.term, Zero, linked);
      assert.deepEqual(solved.instantiate(outer.term), Zero);
      assert.deepEqual(solved.instantiate(inner.term), Zero);
    }
  }
});

test('solving an alias from its deeper occurrence lowers free variables', () => {
  const { outer, inner, context } = pair();
  const linked = unify(outer.term, inner.term, context);
  for (const reverse of [false, true]) {
    const solved = reverse ? unify(variable(1), inner.term, linked) : unify(inner.term, variable(1), linked);
    assert.deepEqual(solved.instantiate(outer.term), variable(0));
    assert.deepEqual(solved.instantiate(inner.term), variable(1));
    assert.deepEqual(toCoreTerm(linked.resolve(inner.variable.id) as ReturnType<typeof metaTerm>, solved), variable(1));
  }
});

test('a deeper occurrence cannot solve an outer variable with the newest local', () => {
  const { outer, inner, context } = pair();
  const linked = unify(outer.term, inner.term, context);
  assert.throws(() => unify(inner.term, variable(0), linked), /Scope escape/);
  assert.throws(() => unify(variable(0), inner.term, linked), /Scope escape/);
  assert.equal(linked.assignment(outer.variable.id), undefined);
  assert.deepEqual(linked.assignment(inner.variable.id), outer.term);
});

test('an explicit ambient scope handles Core terms with additional locals', () => {
  const created = MetaContext.empty().create(1, Nat);
  const solved = unify(created.term, variable(2), created.context, 3);
  assert.deepEqual(solved.instantiate(created.term), variable(0));
  assert.deepEqual(toCoreTerm(created.term, solved, 3), variable(2));
  assert.throws(() => unify(created.term, variable(1), created.context, 3), /Scope escape/);
});

test('explicit occurrence scopes remain available after unresolved resolution', () => {
  const created = MetaContext.empty().create(1, Nat);
  const reference = metaTerm(created.variable.id, 3);
  const solved = unify(reference, variable(2), created.context);
  assert.deepEqual(solved.instantiate(reference), variable(2));
  assert.deepEqual(solved.instantiate(created.term), variable(0));
});

test('invalid or undersized occurrence and ambient scopes are rejected', () => {
  const created = MetaContext.empty().create(2, Nat);
  for (const depth of [-1, 1, 1.5, NaN, Infinity]) {
    assert.throws(() => created.context.resolveAt(created.variable.id, depth), /scope|Scope/);
    assert.throws(() => unify(created.term, Zero, created.context, depth), /Scope/);
    assert.throws(() => toCoreTerm(created.term, created.context, depth), /Scope/);
  }
});

test('direct assignments validate explicit alias occurrence scopes', () => {
  const { outer, inner, context } = pair();
  assert.throws(() => context.assign(inner.variable.id, metaTerm(outer.variable.id, 3)), /Scope escape/);
  assert.throws(() => context.assign(inner.variable.id, metaTerm(outer.variable.id, 0)), /Scope escape/);
  const linked = context.assign(inner.variable.id, metaTerm(outer.variable.id, 2));
  const solved = linked.assign(outer.variable.id, coreTerm(variable(0)));
  assert.deepEqual(solved.instantiate(inner.term), variable(1));
});

test('mixed expressions materialize all references in one shared root scope', () => {
  const { outer, inner, context } = pair();
  const solved = context.assign(outer.variable.id, coreTerm(variable(0))).assign(inner.variable.id, coreTerm(variable(0)));
  assert.deepEqual(toCoreTerm(uApp(outer.term, inner.term), solved), app(variable(1), variable(0)));
});

test('nested Pi and lambda binders preserve local and outer variable identities', () => {
  const { outer, inner, context } = pair();
  const solved = context.assign(inner.variable.id, outer.term).assign(outer.variable.id, coreTerm(lambda(Nat, app(variable(1), variable(0)))));
  const expression = pi(Nat, lambda(Nat, inner.term as unknown as Term));
  assert.deepEqual(toCoreTerm(expression, solved), pi(Nat, lambda(Nat, lambda(Nat, app(variable(4), variable(0))))));
});

test('substitution lifts an explicitly scoped occurrence beneath new binders once', () => {
  const created = MetaContext.empty().create(1, Nat);
  const assigned = created.context.assign(created.variable.id, coreTerm(variable(0)));
  const expression = substituteUnification(lambda(Nat, variable(1)), metaTerm(created.variable.id, 3));
  assert.deepEqual(toCoreTerm(expression, assigned), lambda(Nat, variable(3)));
});

test('cross-scope solved aliases compare correctly beneath binders', () => {
  const { outer, inner, context } = pair();
  const solved = context.assign(inner.variable.id, outer.term).assign(outer.variable.id, coreTerm(variable(0)));
  const expression = lambda(Nat, inner.term as unknown as Term);
  assert.equal(unify(expression, lambda(Nat, variable(2)), solved), solved);
  assert.throws(() => unify(expression, lambda(Nat, variable(1)), solved), /Cannot unify/);
});

test('lowering preserves a function assignment own bound variables', () => {
  const { outer, inner, context } = pair();
  const linked = unify(outer.term, inner.term, context);
  const solved = unify(inner.term, lambda(Nat, app(variable(2), variable(0))), linked);
  assert.deepEqual(solved.instantiate(outer.term), lambda(Nat, app(variable(1), variable(0))));
  assert.throws(() => unify(inner.term, lambda(Nat, app(variable(1), variable(0))), linked), /Scope escape/);
});

test('nested solved aliases cannot hide a captured local in an assignment', () => {
  const outer = MetaContext.empty().create(1, Nat);
  const inner = outer.context.create(2, Nat);
  const target = inner.context.create(1, Nat);
  const assigned = target.context.assign(inner.variable.id, coreTerm(variable(0)));
  assert.throws(() => unify(target.term, uApp(lambda(Nat, variable(0)), inner.term), assigned), /Scope escape/);
  assert.equal(assigned.assignment(target.variable.id), undefined);
});

test('occurs checks follow aliases inside compound assignments', () => {
  const { outer, inner, context } = pair();
  const linked = unify(outer.term, inner.term, context);
  assert.throws(() => unify(inner.term, uApp(lambda(Nat, variable(0)), outer.term), linked), /Occurs check/);
  assert.equal(linked.assignment(outer.variable.id), undefined);
});

test('later structural failure leaves aliases and assignments unchanged', () => {
  const { outer, inner, context } = pair();
  const linked = unify(outer.term, inner.term, context);
  assert.throws(() => unify(uApp(inner.term, Nat), app(variable(1), Zero), linked), /Cannot unify/);
  assert.equal(linked.assignment(outer.variable.id), undefined);
  assert.deepEqual(linked.resolve(inner.variable.id), metaTerm(outer.variable.id, 2));
});

test('Core assignment storage rejects nested metavariables at runtime', () => {
  const { outer, inner, context } = pair();
  assert.throws(() => context.assign(inner.variable.id, coreTerm(uApp(Nat, outer.term) as Term)), /Unassigned metavariable/);
  assert.equal(context.assignment(inner.variable.id), undefined);
});

test('scope validation rejects malformed variable indices and variable types', () => {
  const created = MetaContext.empty().create(1, Nat);
  for (const index of [-1, 0.5, NaN, Infinity]) {
    assert.throws(() => created.context.assign(created.variable.id, coreTerm({ kind: 'Var', index })), /Scope escape/);
    assert.throws(() => MetaContext.empty().create(1, { kind: 'Var', index }), /Scope escape/);
  }
  assert.throws(() => MetaContext.empty().create(1, variable(1)), /Scope escape/);
});

test('rebasing visits equality fields and preserves internal binders', () => {
  const term = lambda(Nat, eq(Nat, variable(1), variable(0)));
  assert.deepEqual(rebaseCoreTerm(term, 1, 3), lambda(Nat, eq(Nat, variable(3), variable(0))));
  assert.deepEqual(rebaseCoreTerm(refl(Nat, variable(2)), 3, 1), refl(Nat, variable(0)));
  assert.throws(() => rebaseCoreTerm(refl(Nat, variable(1)), 3, 1), /Scope escape/);
});

test('scope metadata does not replace Kernel type checking', () => {
  const created = MetaContext.empty().create(0, Nat);
  const assigned = created.context.assign(created.variable.id, coreTerm(Nat));
  assert.throws(() => check([], assigned.instantiate(created.term), Nat));
  const valid = created.context.assign(created.variable.id, coreTerm(Zero));
  check([], valid.instantiate(created.term), Nat);
});

test('bounded scope matrix preserves successful equations in both directions', () => {
  for (let outerDepth = 0; outerDepth <= 3; outerDepth++) {
    for (let innerDepth = outerDepth; innerDepth <= 4; innerDepth++) {
      const { outer, inner, context } = pair(outerDepth, innerDepth);
      for (const reversed of [false, true]) {
        const linked = reversed ? unify(inner.term, outer.term, context) : unify(outer.term, inner.term, context);
        const candidates: Term[] = [Zero, lambda(Nat, variable(0))];
        for (let index = 0; index < innerDepth; index++) candidates.push(variable(index), lambda(Nat, variable(index + 1)));
        for (const value of candidates) {
          const freeIndex = value.kind === 'Var' ? value.index : value.kind === 'Lambda' && value.body.kind === 'Var' && value.body.index > 0 ? value.body.index - 1 : null;
          if (freeIndex !== null && freeIndex < innerDepth - outerDepth) {
            assert.throws(() => unify(inner.term, value, linked), /Scope escape/);
          } else {
            const solved = unify(inner.term, value, linked);
            assert.ok(definitionalEqual(toCoreTerm(outer.term, solved, innerDepth), value));
            assert.ok(definitionalEqual(toCoreTerm(inner.term, solved, innerDepth), value));
            assert.equal(linked.assignments.size, 1);
          }
        }
      }
    }
  }
});

test('the Kernel sees the original outer binding after alias materialization', () => {
  const { outer, inner, context } = pair();
  const solved = context.assign(inner.variable.id, outer.term).assign(outer.variable.id, coreTerm(variable(0)));
  const proof = solved.instantiate(inner.term);
  check([Nat, Type], proof, Nat);
  assert.throws(() => check([Nat, Type], variable(0), Nat));
  const functionProof = toCoreTerm(lambda(Nat, inner.term as unknown as Term), solved);
  check([Nat, Type], functionProof, pi(Nat, Nat));
});
