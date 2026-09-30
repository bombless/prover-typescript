import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { circleCenterProof, circleCenterType, circleRadiusProof, circleRadiusType } from '../src/library/geometry-circle';

test('circle center and radius projections are kernel checked', () => {
  check([], circleCenterProof, circleCenterType);
  check([], circleRadiusProof, circleRadiusType);
});
