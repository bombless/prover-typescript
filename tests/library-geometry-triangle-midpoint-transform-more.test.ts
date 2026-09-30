import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointTransformBundleProof, midpointTransformBundleType } from '../src/library/geometry-triangle-midpoint-transform-more';
test('midpoint rotation and translation bundle checks', () =>
  check([], midpointTransformBundleProof, midpointTransformBundleType));
