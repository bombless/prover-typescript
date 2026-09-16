import test from 'node:test';
import assert from 'node:assert/strict';
import { infer } from '../src/kernel/typecheck';
import { Nat, Type, Zero, variable } from '../src/syntax/ast';
import { MetaContext, MetaVariableError, coreTerm, metaTerm } from '../src/proof/metavariable/meta';

test('metavariable creation records scope and never creates a Core Term', () => {
  const created = MetaContext.empty().create(2, Nat);
  assert.equal(created.variable.id, 0);
  assert.equal(created.variable.scopeDepth, 2);
  assert.equal(created.variable.type, Nat);
  assert.deepEqual(created.term, { kind: 'meta', id: 0 });
  assert.equal((created.term as { kind: string }).kind, 'meta');
});

test('assignment and instantiation resolve a Core term', () => {
  const created = MetaContext.empty().create(0, Nat);
  const assigned = created.context.assign(created.variable.id, coreTerm(Zero));
  assert.equal(assigned.assignment(created.variable.id)?.kind, 'term');
  assert.deepEqual(assigned.instantiate(created.term), Zero);
  assert.deepEqual(assigned.resolve(created.variable.id), coreTerm(Zero));
});

test('unassigned metavariables cannot be instantiated as Core terms', () => {
  const created = MetaContext.empty().create(0, Nat);
  assert.throws(() => created.context.instantiate(created.term), MetaVariableError);
  assert.equal(created.context.assignment(created.variable.id), undefined);
});

test('nested assignments resolve transitively', () => {
  const first = MetaContext.empty().create(0, Nat);
  const second = first.context.create(0, Nat);
  const withFirst = second.context.assign(first.variable.id, second.term);
  const resolved = withFirst.assign(second.variable.id, coreTerm(Zero));
  assert.deepEqual(resolved.instantiate(first.term), Zero);
});

test('self-cycle is rejected without mutating the context', () => {
  const created = MetaContext.empty().create(0, Nat);
  assert.throws(() => created.context.assign(created.variable.id, created.term), /Cyclic|self/);
  assert.equal(created.context.assignment(created.variable.id), undefined);
});

test('indirect cycle is rejected without mutating either prior assignment', () => {
  const first = MetaContext.empty().create(0, Nat);
  const second = first.context.create(0, Nat);
  const assigned = second.context.assign(first.variable.id, second.term);
  assert.throws(() => assigned.assign(second.variable.id, first.term), /Cyclic/);
  assert.deepEqual(assigned.assignment(first.variable.id), second.term);
  assert.equal(assigned.assignment(second.variable.id), undefined);
});

test('scope escape is rejected for Core terms', () => {
  const created = MetaContext.empty().create(1, Nat);
  assert.throws(() => created.context.assign(created.variable.id, coreTerm(variable(1))), /Scope escape/);
  assert.equal(created.context.assignment(created.variable.id), undefined);
});

test('a metavariable cannot depend on a deeper-scope metavariable', () => {
  const outer = MetaContext.empty().create(0, Type);
  const inner = outer.context.create(1, Type);
  assert.throws(() => inner.context.assign(outer.variable.id, inner.term), /Scope escape/);
  assert.equal(inner.context.assignment(outer.variable.id), undefined);
});

test('resolved Core terms cross the Kernel boundary while metavariables do not', () => {
  const created = MetaContext.empty().create(0, Nat);
  const assigned = created.context.assign(created.variable.id, coreTerm(Zero));
  const proof = assigned.instantiate(created.term);
  assert.deepEqual(proof, Zero);
  assert.deepEqual(infer([], proof), Nat);
  assert.equal((created.term as { kind: string }).kind, 'meta');
});
