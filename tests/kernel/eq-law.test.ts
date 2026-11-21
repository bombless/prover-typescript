import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, variable, app, eq } from '../../src/syntax/ast';
import { definitionalEqual } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { eqReflType, eqReflProof } from '../../src/library/eq-law';

test('eq_refl proof has the expected generic reflexivity type', () => {
  check([], eqReflProof, eqReflType);
  assert.ok(definitionalEqual(infer([], eqReflProof), eqReflType));
});

test('eq_refl is usable at Nat', () => {
  const x = variable(0, 'x');
  const applied = app(app(eqReflProof, Nat), x);
  check([Nat], applied, eq(Nat, x, x));
  assert.ok(definitionalEqual(infer([Nat], applied), eq(Nat, x, x)));
});
