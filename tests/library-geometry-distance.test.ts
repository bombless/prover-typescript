import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { distanceSq, distanceSqType, originDistanceProof, originDistanceType, distanceConcreteProof, distanceConcreteType, distanceFormulaProof, distanceFormulaType, zeroFirstDistanceProof, zeroFirstDistanceType, distanceLargerConcreteProof, distanceLargerConcreteType } from '../src/library/geometry-distance';

test('squared coordinate distance is kernel checked', () => {
  check([], distanceSq, distanceSqType);
  check([], originDistanceProof, originDistanceType);
  check([], distanceConcreteProof, distanceConcreteType);
  check([], distanceFormulaProof, distanceFormulaType);
  check([], zeroFirstDistanceProof, zeroFirstDistanceType);
  check([], distanceLargerConcreteProof, distanceLargerConcreteType);
});
