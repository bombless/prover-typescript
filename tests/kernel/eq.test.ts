import test from 'node:test';
import assert from 'node:assert/strict';
import { Type, Nat, Zero, variable, lambda, app, succ, eq, refl, eqRec, natLiteral } from '../../src/syntax/ast';
import { definitionalEqual, normalize } from '../../src/kernel/reduction';
import { check, infer, TypeError } from '../../src/kernel/typecheck';

test('Eq is a proposition type', () => {
  const proposition = eq(Nat, natLiteral(3), natLiteral(3));
  assert.ok(definitionalEqual(infer([], proposition), Type));
  check([], proposition, Type);
});

test('Refl proves Eq Nat 3 3', () => {
  const proof = refl(Nat, natLiteral(3));
  const proposition = eq(Nat, natLiteral(3), natLiteral(3));

  check([], proof, proposition);
  assert.ok(definitionalEqual(infer([], proof), proposition));
});

test('Refl infers an equality from the type of its value', () => {
  const proof = refl(Nat, natLiteral(3));
  assert.ok(definitionalEqual(infer([], proof), eq(Nat, natLiteral(3), natLiteral(3))));
});

test('Eq.rec has the expected dependent result type', () => {
  // P(n) = Eq Nat n n. The motive genuinely depends on the eliminated Nat.
  const motive = lambda(Nat, eq(Nat, variable(0), variable(0)), 'n');
  const left = natLiteral(3);
  const right = natLiteral(3);
  const reflCase = refl(Nat, left);
  const equality = refl(Nat, left);
  const term = eqRec(motive, reflCase, left, right, equality);
  const expectedType = app(motive, right);

  check([], term, expectedType);
  assert.ok(definitionalEqual(infer([], term), expectedType));
});

test('Eq.rec reduces on Refl', () => {
  const motive = lambda(Nat, eq(Nat, variable(0), variable(0)), 'n');
  const value = natLiteral(3);
  const reflCase = refl(Nat, value);
  const term = eqRec(motive, reflCase, value, value, refl(Nat, value));

  assert.ok(definitionalEqual(term, reflCase));
  assert.deepEqual(normalize(term), reflCase);
});

test('Eq.rec supports a dependent motive whose result changes with the value', () => {
  // P(n) = Eq Nat (Succ n) (Succ n).
  const motive = lambda(Nat, eq(Nat, succ(variable(0)), succ(variable(0))), 'n');
  const value = natLiteral(2);
  const reflCase = refl(Nat, succ(value));
  const term = eqRec(motive, reflCase, value, value, refl(Nat, value));
  const expectedType = app(motive, value);

  check([], term, expectedType);
  assert.ok(definitionalEqual(normalize(term), reflCase));
});

test('Eq.rec rejects an equality whose endpoints have the wrong type', () => {
  const motive = lambda(Nat, Type, 'n');
  const left = Zero;
  const right = Zero;
  const badEquality = eq(Type, Type, Type);
  const term = eqRec(motive, Type, left, right, badEquality);

  assert.throws(() => infer([], term), (error: unknown) => error instanceof TypeError);
});

test('Eq.rec rejects a motive that is not indexed by the equality type', () => {
  const motive = lambda(Type, Type, 'T');
  const value = natLiteral(3);
  const term = eqRec(motive, Type, value, value, refl(Nat, value));

  assert.throws(() => infer([], term), (error: unknown) => error instanceof TypeError);
});
