import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { distanceSq, distanceSqType, originDistanceProof, originDistanceType } from '../src/library/geometry-distance';

test('squared coordinate distance is kernel checked', () => {
  check([], distanceSq, distanceSqType);
  check([], originDistanceProof, originDistanceType);
});
