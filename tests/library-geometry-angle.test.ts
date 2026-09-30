import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rightAngle, rightAngleType, axisRightAngleProof, axisRightAngleType, zeroRightAngleProof, zeroRightAngleType } from '../src/library/geometry-angle';

test('right-angle predicate and axis certificate are kernel checked', () => {
  check([], rightAngleType, { kind: 'Type' });
  check([], axisRightAngleProof, axisRightAngleType);
});
test('zero vector is right-angle-compatible with every vector', () => check([], zeroRightAngleProof, zeroRightAngleType));
