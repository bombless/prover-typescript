import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-zero-relation-parametric-bundle-more';

test('zero parallel and perpendicular relations are kernel checked', () => {
  check([], c.zeroParallelGeneralProof, c.zeroParallelGeneralType);
  check([], c.zeroPerpendicularGeneralProof, c.zeroPerpendicularGeneralType);
});

test('zero right-angle relation is kernel checked', () =>
  check([], c.zeroRightAngleGeneralProof, c.zeroRightAngleGeneralType));
