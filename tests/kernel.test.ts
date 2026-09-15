import test from 'node:test';
import assert from 'node:assert/strict';
import { Type, Nat, Zero, variable, pi, lambda, app, succ, natRec, eq, refl, natLiteral } from '../src/syntax/ast';
import { definitionalEqual, normalize } from '../src/kernel/reduction';
import { check, infer, typeCheck, inferLambdaApplication, TypeError, show } from '../src/kernel/typecheck';
import { add, addTerm, addType, numeral } from '../src/library/nat';

test('core sorts and Nat constructors type check', () => {
  assert.ok(definitionalEqual(infer([], Nat), Type));
  assert.ok(definitionalEqual(infer([], Zero), Nat));
  assert.ok(definitionalEqual(infer([], succ(Zero)), Nat));
});

test('identity lambda checks against Pi', () => {
  const id = lambda(Nat, variable(0, 'x'), 'x');
  const idType = pi(Nat, Nat, 'x');
  check([], id, idType);
  assert.ok(definitionalEqual(inferLambdaApplication(id, natLiteral(3)), natLiteral(3)));
  assert.ok(definitionalEqual(normalize(app(id, natLiteral(3))), natLiteral(3)));
});

test('beta reduction works', () => {
  const term = app(lambda(Nat, succ(variable(0))), natLiteral(2));
  assert.ok(definitionalEqual(normalize(term), natLiteral(3)));
});

test('nested beta reduction preserves the outer binder', () => {
  const constant = lambda(Nat, lambda(Nat, variable(1)));
  const applied = app(app(constant, natLiteral(3)), natLiteral(4));
  assert.ok(definitionalEqual(normalize(applied), natLiteral(3)));
});

test('substitution avoids variable capture under nested lambdas', () => {
  const term = app(lambda(Nat, lambda(Nat, variable(1))), variable(0));
  const expected = lambda(Nat, variable(1));
  assert.deepEqual(normalize(term), expected);
});

test('addition has the expected type', () => {
  check([], add, addType);
  check([], add, addType);
  assert.ok(definitionalEqual(infer([], add), addType));
});

test('closed addition reduces', () => {
  assert.ok(definitionalEqual(normalize(addTerm(numeral(0), numeral(3))), numeral(3)));
  assert.ok(definitionalEqual(normalize(addTerm(numeral(1), numeral(3))), numeral(4)));
  assert.ok(definitionalEqual(normalize(addTerm(numeral(2), numeral(3))), numeral(5)));
});

test('addition with an unknown first argument does not reduce definitionally', () => {
  const ctx = [Nat] as const;
  const n = variable(0, 'n');
  assert.ok(!definitionalEqual(addTerm(n, numeral(0)), n));
  assert.ok(definitionalEqual(infer(ctx, addTerm(n, numeral(0))), Nat));
});

test('reflexivity proves equality of a well-typed term', () => {
  const proof = refl(Nat, numeral(3));
  const proposition = eq(Nat, numeral(3), numeral(3));
  check([], proof, proposition);
});

test('ill-typed application is rejected', () => {
  assert.throws(() => infer([], app(Zero, Zero)), (error: unknown) => error instanceof TypeError);
});

test('Nat recursion computes zero and successor cases', () => {
  const motive = lambda(Nat, Nat);
  const zeroCase = numeral(7);
  const succCase = lambda(Nat, lambda(Nat, succ(variable(0))));
  const rec = natRec(motive, zeroCase, succCase, numeral(2));
  assert.ok(definitionalEqual(normalize(rec), numeral(9)));
});
