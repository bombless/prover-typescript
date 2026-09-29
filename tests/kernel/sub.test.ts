import assert from 'node:assert/strict';
import test from 'node:test';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { check } from '../../src/kernel/typecheck';
import { numeral } from '../../src/library/nat';
import {
  pred, predType, predTerm, predZeroType, predZeroProof, predSuccType, predSuccProof,
  sub, subType, subTerm, subZeroType, subZeroProof, subSuccType, subSuccProof,
} from '../../src/library/sub';
import { Nat, Type, Zero, app, eq, lambda, succ, variable } from '../../src/syntax/ast';

test('predecessor and subtraction have ordinary natural-number function types', () => {
  check([], pred, predType);
  check([], sub, subType);
});

test('the four defining equations are Kernel-checked generic proofs', () => {
  check([], predZeroProof, predZeroType);
  check([], predSuccProof, predSuccType);
  check([], subZeroProof, subZeroType);
  check([], subSuccProof, subSuccType);
});

test('predecessor saturates at zero and computes successors', () => {
  for (let value = 0; value <= 8; value++) {
    const term = predTerm(numeral(value));
    check([], term, Nat);
    assert.ok(definitionalEqual(term, numeral(Math.max(0, value - 1))));
  }
});

test('truncated subtraction computes all small argument pairs', () => {
  for (let left = 0; left <= 7; left++) {
    for (let right = 0; right <= 7; right++) {
      const term = subTerm(numeral(left), numeral(right));
      check([], term, Nat);
      assert.deepEqual(normalize(term), numeral(Math.max(0, left - right)));
    }
  }
});

test('subtraction obeys zero and successor equations for open local terms', () => {
  const context = [Nat, Nat];
  const n = variable(1), m = variable(0);
  check(context, subTerm(n, m), Nat);
  assert.ok(definitionalEqual(subTerm(n, Zero), n));
  assert.ok(definitionalEqual(subTerm(n, succ(m)), predTerm(subTerm(n, m))));
  check(context, app(app(subSuccProof, n), m), eq(Nat, subTerm(n, succ(m)), predTerm(subTerm(n, m))));
});

test('the operators preserve outer variables when placed under binders', () => {
  const context = [Nat];
  const fn = lambda(Nat, subTerm(variable(1), variable(0)), 'm');
  assert.ok(definitionalEqual(app(fn, Zero), variable(0)));
  check(context, app(fn, Zero), Nat);
  const proof = app(predSuccProof, variable(0));
  check(context, proof, eq(Nat, predTerm(succ(variable(0))), variable(0)));
});

test('the Kernel rejects non-natural subtraction and predecessor arguments', () => {
  assert.throws(() => check([], predTerm(Type), Nat), /Type mismatch/);
  assert.throws(() => check([], subTerm(Type, Zero), Nat), /Type mismatch/);
  assert.throws(() => check([], subTerm(Zero, Type), Nat), /Type mismatch/);
});
