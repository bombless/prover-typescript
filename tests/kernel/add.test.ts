import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, Zero, variable, pi, lambda, natRec, succ, natLiteral } from '../../src/syntax/ast';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';
import { add, addTerm, addType } from '../../src/library/nat';

test('add has the expected Nat.rec core AST', () => {
  const expected = lambda(
    Nat,
    lambda(
      Nat,
      natRec(
        lambda(Nat, Nat),
        variable(0),
        lambda(Nat, lambda(Nat, succ(variable(0)))),
        variable(1)
      ),
      'm'
    ),
    'n'
  );

  assert.deepEqual(add, expected);
});

test('add has type Nat -> Nat -> Nat', () => {
  assert.ok(definitionalEqual(infer([], add), addType));
  check([], add, addType);
  assert.ok(definitionalEqual(addType, pi(Nat, pi(Nat, Nat))));
});

test('add computes the required closed arithmetic cases', () => {
  assert.ok(definitionalEqual(normalize(addTerm(natLiteral(0), natLiteral(3))), natLiteral(3)));
  assert.ok(definitionalEqual(normalize(addTerm(natLiteral(1), natLiteral(3))), natLiteral(4)));
  assert.ok(definitionalEqual(normalize(addTerm(natLiteral(2), natLiteral(3))), natLiteral(5)));
  assert.ok(definitionalEqual(normalize(addTerm(natLiteral(3), natLiteral(4))), natLiteral(7)));
});

test('add with an unknown first argument stays neutral', () => {
  const ctx = [Nat] as const;
  const n = variable(0, 'n');
  const term = addTerm(n, Zero);

  assert.ok(!definitionalEqual(term, n));
  assert.ok(definitionalEqual(infer(ctx, term), Nat));
});
