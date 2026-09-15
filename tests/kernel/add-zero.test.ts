import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, Zero, variable, pi, app, succ, eq, refl } from '../../src/syntax/ast';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { addTerm, numeral } from '../../src/library/nat';
import { addZeroProof, addZeroType, addZeroSuccessorCase, addZeroMotive } from '../../src/library/add-zero';

test('add_zero proof term has the expected dependent function type', () => {
  check([], addZeroProof, addZeroType);
  assert.ok(definitionalEqual(infer([], addZeroProof), addZeroType));
});

test('add_zero base case is Refl 0 after definitional reduction', () => {
  const baseCase = refl(Nat, Zero);
  const baseType = app(addZeroMotive, Zero);

  check([], baseCase, baseType);
  assert.ok(definitionalEqual(infer([], baseCase), eq(Nat, addTerm(Zero, Zero), Zero)));
  assert.ok(definitionalEqual(normalize(addTerm(Zero, Zero)), Zero));
});

test('add_zero successor case uses the induction hypothesis through Eq.rec', () => {
  const expectedSuccessorCaseType = pi(
    Nat,
    pi(
      app(addZeroMotive, variable(0)),
      app(addZeroMotive, succ(variable(1)))
    )
  );

  check([], addZeroSuccessorCase, expectedSuccessorCaseType);

  assert.equal(addZeroSuccessorCase.kind, 'Lambda');
  assert.equal(addZeroSuccessorCase.body.kind, 'Lambda');
  assert.equal(addZeroSuccessorCase.body.body.kind, 'EqRec');
  assert.equal(addZeroSuccessorCase.body.body.equality.kind, 'Var');
  assert.equal(addZeroSuccessorCase.body.body.equality.index, 0);
});

test('add_zero proof application checks for concrete numerals', () => {
  for (const n of [0, 1, 2, 3]) {
    const proof = app(addZeroProof, numeral(n));
    const expected = eq(Nat, addTerm(numeral(n), Zero), numeral(n));

    check([], proof, expected);
    assert.ok(definitionalEqual(infer([], proof), expected));
  }
});

test('add_zero proof is propositional rather than definitional for an unknown n', () => {
  const n = variable(0, 'n');
  const proposition = eq(Nat, addTerm(n, Zero), n);

  assert.ok(!definitionalEqual(addTerm(n, Zero), n));
  assert.ok(definitionalEqual(infer([Nat], app(addZeroProof, n)), proposition));
});
