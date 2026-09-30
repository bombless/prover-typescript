import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointTransformBundleProof, midpointTransformBundleType } from '../src/library/geometry-midpoint-transform-bundle-more';

test('midpoint transform bundle checks', () =>
  check([], midpointTransformBundleProof, midpointTransformBundleType));
