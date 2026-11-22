import test from 'node:test';
import assert from 'node:assert/strict';
import { Point, Nat, variable, pi, lambda, eq, refl } from '../../src/syntax/ast';
import { definitionalEqual, normalize, shift, substitute } from '../../src/kernel/reduction';
import { check, infer } from '../../src/kernel/typecheck';

test('Point is an opaque sort whose type is Type', () => {
  check([], Point, { kind: 'Type' });
  assert.ok(definitionalEqual(infer([], Point), { kind: 'Type' }));
  assert.equal(normalize(Point), Point);
  assert.ok(definitionalEqual(Point, Point));
});

test('a Pi binder may quantify over Point', () => {
  const pointIdentityType = pi(Point, Point, 'A');
  check([], pointIdentityType, { kind: 'Type' });
  const pointIdentity = lambda(Point, variable(0, 'A'), 'A');
  check([], pointIdentity, pointIdentityType);
  assert.ok(definitionalEqual(infer([], pointIdentity), pointIdentityType));
});

test('Point variables keep their Point type through the context', () => {
  const ctx = [Point];
  assert.ok(definitionalEqual(infer(ctx, variable(0, 'A')), Point));
});

test('equality is supported over Point', () => {
  const pointEq = eq(Point, variable(0, 'A'), variable(0, 'A'));
  check([Point], pointEq, { kind: 'Type' });
  const proof = refl(Point, variable(0, 'A'));
  check([Point], proof, pointEq);
  assert.ok(definitionalEqual(infer([Point], proof), pointEq));
});

test('Point is neutral under shift and substitution', () => {
  assert.equal(shift(Point, 3), Point);
  assert.equal(substitute(Point, Nat), Point);
});
