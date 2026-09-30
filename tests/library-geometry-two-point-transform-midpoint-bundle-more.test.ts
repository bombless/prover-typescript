import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { twoPointTransformMidpointBundleProof, twoPointTransformMidpointBundleType } from '../src/library/geometry-two-point-transform-midpoint-bundle-more';

test('two point transform midpoint bundle checks', () =>
  check([], twoPointTransformMidpointBundleProof, twoPointTransformMidpointBundleType));
