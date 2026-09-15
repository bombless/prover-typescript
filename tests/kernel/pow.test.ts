import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, Zero, variable, pi, lambda, natRec, succ, natLiteral } from '../../src/syntax/ast';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { mulTerm } from '../../src/library/mul';
import { pow, powTerm, powType } from '../../src/library/pow';

test('pow has the expected Nat.rec Core AST and recurses on the second argument', () => {
  const expected = lambda(
    Nat,
    lambda(
      Nat,
      natRec(
        lambda(Nat, Nat),
        succ(Zero),
        lambda(
          Nat,
          lambda(Nat, mulTerm(variable(3), variable(0)))
        ),
        variable(0)
      ),
      'k'
    ),
    'n'
  );

  assert.deepEqual(pow, expected);
});

test('pow has type Nat -> Nat -> Nat', () => {
  assert.ok(definitionalEqual(infer([], pow), powType));
  check([], pow, powType);
  assert.ok(definitionalEqual(powType, pi(Nat, pi(Nat, Nat))));
});

test('pow computes the required closed arithmetic cases', () => {
  assert.ok(definitionalEqual(normalize(powTerm(natLiteral(2), natLiteral(0))), natLiteral(1)));
  assert.ok(definitionalEqual(normalize(powTerm(natLiteral(2), natLiteral(1))), natLiteral(2)));
  assert.ok(definitionalEqual(normalize(powTerm(natLiteral(2), natLiteral(2))), natLiteral(4)));
  assert.ok(definitionalEqual(normalize(powTerm(natLiteral(2), natLiteral(3))), natLiteral(8)));
  assert.ok(definitionalEqual(normalize(powTerm(natLiteral(3), natLiteral(2))), natLiteral(9)));
});
