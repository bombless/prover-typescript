import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, Zero, variable, pi, lambda, natRec, app, natLiteral } from '../../src/syntax/ast';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { addTerm } from '../../src/library/nat';
import { mul, mulTerm, mulType } from '../../src/library/mul';

test('mul has the expected Nat.rec Core AST and recurses on the first argument', () => {
  const expected = lambda(
    Nat,
    lambda(
      Nat,
      natRec(
        lambda(Nat, Nat),
        Zero,
        lambda(
          Nat,
          lambda(Nat, addTerm(variable(2), variable(0)))
        ),
        variable(1)
      ),
      'm'
    ),
    'n'
  );

  assert.deepEqual(mul, expected);
});

test('mul has type Nat -> Nat -> Nat', () => {
  assert.ok(definitionalEqual(infer([], mul), mulType));
  check([], mul, mulType);
  assert.ok(definitionalEqual(mulType, pi(Nat, pi(Nat, Nat))));
});

test('mul computes the required closed arithmetic cases', () => {
  assert.ok(definitionalEqual(normalize(mulTerm(natLiteral(0), natLiteral(3))), natLiteral(0)));
  assert.ok(definitionalEqual(normalize(mulTerm(natLiteral(1), natLiteral(3))), natLiteral(3)));
  assert.ok(definitionalEqual(normalize(mulTerm(natLiteral(2), natLiteral(3))), natLiteral(6)));
  assert.ok(definitionalEqual(normalize(mulTerm(natLiteral(3), natLiteral(4))), natLiteral(12)));
});

test('mul with an unknown first argument stays neutral', () => {
  const ctx = [Nat] as const;
  const n = variable(0, 'n');
  const term = mulTerm(n, Zero);

  assert.ok(!definitionalEqual(term, Zero));
  assert.equal(normalize(term).kind, 'NatRec');
  assert.ok(definitionalEqual(infer(ctx, term), Nat));
});
