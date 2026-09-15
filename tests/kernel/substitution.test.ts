import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, variable, lambda, app, pi, natLiteral } from '../../src/syntax/ast';
import { normalize } from '../../src/kernel/reduction';
import { check } from '../../src/kernel/typecheck';

test('identity substitution', () => {
  const term = app(lambda(Nat, variable(0)), natLiteral(3));
  assert.deepEqual(normalize(term), natLiteral(3));
});

test('constant function substitution', () => {
  const term = app(app(lambda(Nat, lambda(Nat, variable(1))), natLiteral(3)), natLiteral(4));
  assert.deepEqual(normalize(term), natLiteral(3));
});

test('nested lambda substitution preserves de Bruijn depth', () => {
  const term = app(lambda(Nat, lambda(Nat, variable(1))), natLiteral(3));
  const expected = lambda(Nat, natLiteral(3));
  assert.deepEqual(normalize(term), expected);
});

test('shadowing remains local to the inner binder', () => {
  const term = app(
    lambda(Nat, lambda(Nat, variable(0))),
    natLiteral(3)
  );
  const expected = lambda(Nat, variable(0));
  assert.deepEqual(normalize(term), expected);
});

test('capture avoidance shifts a free variable across a binder', () => {
  const ctx = [Nat] as const;
  const term = app(lambda(Nat, lambda(Nat, variable(1))), variable(0));
  check(ctx, term, pi(Nat, Nat));
  assert.deepEqual(normalize(term), lambda(Nat, variable(1)));
});
