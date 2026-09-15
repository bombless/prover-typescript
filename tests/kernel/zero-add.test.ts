import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, Zero, variable, app, eq, refl } from '../../src/syntax/ast';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { addTerm, numeral } from '../../src/library/nat';
import { zeroAddMotive, zeroAddProof, zeroAddType } from '../../src/library/zero-add';

test('zero_add proof has the expected type', () => {
  check([], zeroAddProof, zeroAddType);
  assert.ok(definitionalEqual(infer([], zeroAddProof), zeroAddType));
});

test('zero_add is reflexivity after definitional reduction', () => {
  const proof = app(zeroAddProof, variable(0, 'n'));
  const expected = app(zeroAddMotive, variable(0, 'n'));
  check([Nat], proof, expected);
  assert.equal(normalize(addTerm(Zero, variable(0))).kind, 'Var');
  assert.ok(definitionalEqual(infer([Nat], proof), expected));
  check([], refl(Nat, Zero), app(zeroAddMotive, Zero));
  assert.ok(definitionalEqual(infer([], refl(Nat, Zero)), eq(Nat, addTerm(Zero, Zero), Zero)));
});

test('zero_add concrete applications are kernel-checked', () => {
  for (const n of [0, 1, 2, 3]) {
    const proof = app(zeroAddProof, numeral(n));
    const expected = eq(Nat, addTerm(Zero, numeral(n)), numeral(n));
    check([], proof, expected);
    assert.ok(definitionalEqual(infer([], proof), expected));
  }
});
