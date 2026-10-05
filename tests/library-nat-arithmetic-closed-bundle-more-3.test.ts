import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as a from '../src/library/nat-arithmetic-closed-bundle-more-3';
test('further closed arithmetic certificates are kernel checked', () => {
  check([], a.powThreeFourProof, a.powThreeFourType);
  check([], a.powFiveTwoProof, a.powFiveTwoType);
  check([], a.productNineEightProof, a.productNineEightType);
  check([], a.addLargeProof, a.addLargeType);
  check([], a.nestedPowerArithmeticProof, a.nestedPowerArithmeticType);
  check([], a.predecessorProductProof, a.predecessorProductType);
  check([], a.truncatedSubtractionProof, a.truncatedSubtractionType);
});
