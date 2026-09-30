import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointCoordinateBundleProof, midpointCoordinateBundleType } from '../src/library/geometry-midpoint-coordinate-bundle-more';
test('midpoint coordinate bundle checks for arbitrary endpoints', () =>
  check([], midpointCoordinateBundleProof, midpointCoordinateBundleType));
