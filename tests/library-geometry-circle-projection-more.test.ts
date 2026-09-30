import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { concreteCircleCenterProof, concreteCircleCenterType, concreteCircleRadiusProof, concreteCircleRadiusType } from '../src/library/geometry-circle-laws';
test('concrete circle projections are kernel checked', () => {
  check([], concreteCircleCenterProof, concreteCircleCenterType);
  check([], concreteCircleRadiusProof, concreteCircleRadiusType);
});
