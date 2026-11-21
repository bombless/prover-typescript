import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, Zero, variable, app, succ, eq, natLiteral } from '../../src/syntax/ast';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { addTerm, numeral } from '../../src/library/nat';
import { mulTerm } from '../../src/library/mul';
import { powTerm } from '../../src/library/pow';
import {
  zeroMulType, zeroMulProof,
  succMulType, succMulProof,
  powZeroType, powZeroProof,
  powSuccType, powSuccProof,
} from '../../src/library/mul-law';

test('zero_mul proof has the expected type', () => {
  check([], zeroMulProof, zeroMulType);
  assert.ok(definitionalEqual(infer([], zeroMulProof), zeroMulType));
});

test('succ_mul proof has the expected type', () => {
  check([], succMulProof, succMulType);
  assert.ok(definitionalEqual(infer([], succMulProof), succMulType));
});

test('pow_zero proof has the expected type', () => {
  check([], powZeroProof, powZeroType);
  assert.ok(definitionalEqual(infer([], powZeroProof), powZeroType));
});

test('pow_succ proof has the expected type', () => {
  check([], powSuccProof, powSuccType);
  assert.ok(definitionalEqual(infer([], powSuccProof), powSuccType));
});

test('zero_mul concrete applications reduce to 0', () => {
  for (const n of [0, 1, 2, 3]) {
    check([], app(zeroMulProof, numeral(n)), eq(Nat, mulTerm(Zero, numeral(n)), Zero));
    assert.ok(definitionalEqual(normalize(mulTerm(Zero, numeral(n))), Zero));
  }
});

test('succ_mul concrete applications are Kernel-checked', () => {
  for (const [n, m] of [[0, 2], [1, 3], [2, 2]]) {
    const proof = app(app(succMulProof, numeral(n)), numeral(m));
    const expected = eq(
      Nat,
      mulTerm(succ(numeral(n)), numeral(m)),
      addTerm(numeral(m), mulTerm(numeral(n), numeral(m)))
    );
    check([], proof, expected);
    assert.ok(definitionalEqual(infer([], proof), expected));
  }
});

test('pow_zero concrete applications reduce to 1', () => {
  for (const n of [0, 2, 3]) {
    check([], app(powZeroProof, numeral(n)), eq(Nat, powTerm(numeral(n), Zero), natLiteral(1)));
    assert.ok(definitionalEqual(normalize(powTerm(numeral(n), Zero)), natLiteral(1)));
  }
});

test('pow_succ concrete applications are Kernel-checked', () => {
  for (const [n, k] of [[2, 2], [3, 1]]) {
    const proof = app(app(powSuccProof, numeral(n)), numeral(k));
    const expected = eq(
      Nat,
      powTerm(numeral(n), succ(numeral(k))),
      mulTerm(numeral(n), powTerm(numeral(n), numeral(k)))
    );
    check([], proof, expected);
    assert.ok(definitionalEqual(infer([], proof), expected));
  }
});
