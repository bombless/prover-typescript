import assert from 'node:assert/strict';
import test from 'node:test';
import { check, infer, show, TypeError } from '../src/kernel/typecheck';
import { Angle, Cartesian, Real, point, realLiteral } from '../src/syntax/ast';
import { coordinates, pointEquality, radians } from '../src/library/geometry';
import { parse } from '../src/parser/parser';
import { elaborate } from '../src/elaborator/elaborate';

test('real values, points, and angles have geometric types', () => {
  assert.deepEqual(infer([], realLiteral(1.5)), Real);
  assert.deepEqual(infer([], coordinates(2, -3)), Cartesian);
  assert.deepEqual(infer([], radians(Math.PI / 2)), Angle);
  assert.equal(show(coordinates(2, -3)), '(2, -3)');
});

test('points reject non-real coordinates', () => {
  assert.throws(() => infer([], point({ kind: 'Zero' }, realLiteral(1))), TypeError);
});

test('surface geometry names elaborate', () => {
  assert.deepEqual(elaborate(parse('Real')), Real);
  assert.deepEqual(elaborate(parse('Cartesian')), Cartesian);
  assert.deepEqual(elaborate(parse('Angle')), Angle);
  check([], pointEquality(coordinates(0, 0), coordinates(0, 0)), { kind: 'Type' });
});
