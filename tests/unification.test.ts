import assert from 'node:assert/strict';
import test from 'node:test';
import { MetaContext, coreTerm } from '../src/proof/metavariable/meta';
import { UnificationError, uApp, unify } from '../src/proof/unification';
import { Nat, Zero, app, succ, variable } from '../src/syntax/ast';

test('unification assigns a metavariable to a Core term', () => {
  const created = MetaContext.empty().create(0, Nat);
  const result = unify(created.term, Nat, created.context);
  assert.deepEqual(result.resolve(created.variable.id), coreTerm(Nat));
});

test('application unification solves P ?x = P n', () => {
  const created = MetaContext.empty().create(0, Nat);
  const p = variable(0, 'P');
  const n = succ(Zero);
  const result = unify(uApp(p, created.term), app(p, n), created.context);
  assert.deepEqual(result.resolve(created.variable.id), coreTerm(n));
});

test('nested application unification solves f ?x = f (g n)', () => {
  const created = MetaContext.empty().create(2, Nat);
  const f = variable(0, 'f');
  const g = variable(1, 'g');
  const result = unify(uApp(f, created.term), uApp(f, uApp(g, Zero)), created.context);
  assert.deepEqual(result.resolve(created.variable.id), coreTerm(app(g, Zero)));
});

test('constructor mismatch is rejected without mutating the context', () => {
  const context = MetaContext.empty();
  assert.throws(() => unify(Zero, succ(Zero), context), UnificationError);
  assert.equal(context.variables.length, 0);
  assert.equal(context.assignments.size, 0);
});

test('occurs check rejects ?x = f ?x without mutation', () => {
  const created = MetaContext.empty().create(0, Nat);
  const f = variable(0, 'f');
  assert.throws(() => unify(created.term, uApp(f, created.term), created.context), /Occurs check/);
  assert.equal(created.context.assignment(created.variable.id), undefined);
});

test('scope safety is preserved by unification assignments', () => {
  const outer = MetaContext.empty().create(0, Nat);
  const inner = outer.context.create(1, Nat);
  assert.throws(() => unify(outer.term, variable(1), inner.context), /Scope escape/);
  assert.equal(inner.context.assignment(outer.variable.id), undefined);
});

test('failed unification leaves prior assignments stable', () => {
  const created = MetaContext.empty().create(0, Nat);
  const assigned = created.context.assign(created.variable.id, coreTerm(Zero));
  assert.throws(() => unify(Zero, succ(Zero), assigned), UnificationError);
  assert.deepEqual(assigned.resolve(created.variable.id), coreTerm(Zero));
});

test('M20 conflicting implicit constraints reject without mutating prior assignments', () => {
  const created = MetaContext.empty().create(0, Nat);
  const first = unify(created.term, Nat, created.context);
  assert.throws(() => unify(created.term, succ(Zero), first), UnificationError);
  assert.deepEqual(first.resolve(created.variable.id), coreTerm(Nat));
  assert.equal(created.context.assignments.size, 0);
});
