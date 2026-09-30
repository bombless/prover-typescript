import test from 'node:test';
import assert from 'node:assert/strict';
import { Bool, Nat, Type, True, pair, prod, fst, snd, variable } from '../../src/syntax/ast';
import { check, infer } from '../../src/kernel/typecheck';
import { definitionalEqual } from '../../src/kernel/reduction';

test('product types and projections compute in the kernel', () => {
  const pointType = prod(Nat, Bool);
  const point = pair({ kind: 'Zero' }, True);
  check([], pointType, Type);
  check([], point, pointType);
  assert.ok(definitionalEqual(infer([], fst(point)), Nat));
  assert.ok(definitionalEqual(infer([], snd(point)), Bool));
  assert.ok(definitionalEqual(fst(point), { kind: 'Zero' }));
  assert.ok(definitionalEqual(snd(point), True));
});

test('product eta is definitionally equal for a local variable', () => {
  const pointType = prod(Nat, Bool);
  const point = variable(0, 'p');
  const eta = pair(fst(point), snd(point));
  check([pointType], eta, pointType);
  assert.ok(definitionalEqual(eta, point));
});

test('nested product eta is definitionally equal', () => {
  const nestedType = prod(Nat, prod(Bool, Nat));
  const point = variable(0, 'p');
  const eta = pair(fst(point), snd(point));
  check([nestedType], eta, nestedType);
  assert.ok(definitionalEqual(eta, point));
});
