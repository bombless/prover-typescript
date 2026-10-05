import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-relation-composition-parametric-more';

test('parametric relation composition is kernel checked', () => {
  check([], c.parallelIffCrossZeroProof, c.parallelIffCrossZeroType);
  check([], c.perpendicularIffDotZeroProof, c.perpendicularIffDotZeroType);
  check([], c.rightAngleIffDotZeroProof, c.rightAngleIffDotZeroType);
  check([], c.zeroRelationProductProof, c.zeroRelationProductType);
});
