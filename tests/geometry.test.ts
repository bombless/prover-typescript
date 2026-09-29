import test from 'node:test';
import assert from 'node:assert/strict';
import { Type, axiom, eq, refl, app } from '../src/syntax/ast';
import { check, infer, show } from '../src/kernel/typecheck';
import { normalize } from '../src/kernel/reduction';
import { GlobalEnvironment } from '../src/environment/environment';
import { elaborate } from '../src/elaborator/elaborate';
import { parse } from '../src/parser/parser';
import { Real, Point, point, xCoord, yCoord, angle, Angle, angleMeasure, measure, RealZero, RealOne, realAdd, installGeometryEnvironment } from '../src/library/geometry';

test('Real is an explicit mathematical type, not a JavaScript number', () => {
  assert.equal(infer([], Real).kind, 'Type');
  assert.equal(infer([], RealZero).kind, 'Axiom');
  check([], RealOne, Real);
  assert.equal(show(infer([], realAdd(RealZero, RealOne))), 'Real');
});

test('Cartesian points are real coordinate pairs with projections', () => {
  const p = point(RealZero, RealOne);
  check([], p, Point);
  check([], xCoord(p), Real);
  check([], yCoord(p), Real);
  assert.equal(show(normalize(xCoord(p))), 'realZero');
  assert.equal(show(normalize(yCoord(p))), 'realOne');
});

test('Angle is a typed three-point geometric object with a real measure', () => {
  const a = point(RealZero, RealZero);
  const b = point(RealOne, RealZero);
  const c = point(RealOne, RealOne);
  const abc = angle(a, b, c);
  check([], abc, app(app(app(Angle, a), b), c));
  check([], measure(a, b, c, abc), Real);
  check([], app(app(app(app(angleMeasure, a), b), c), abc), Real);
});

test('geometry definitions are available to source-level proofs', () => {
  const env = installGeometryEnvironment(new GlobalEnvironment());
  const proposition = elaborate(parse('Eq Real realZero realZero'), [], env);
  const proof = elaborate(parse('Refl Real realZero'), [], env);
  check([], proof, proposition);
  assert.equal(show(proposition), 'Eq Real realZero realZero');
});

test('axioms remain explicit in the proof term', () => {
  const R = axiom('R', Type);
  const r = axiom('r', R);
  const proposition = eq(R, r, r);
  check([], refl(R, r), proposition);
});
