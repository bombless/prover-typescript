import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { zeroScaleCoordinateBundleProof, zeroScaleCoordinateBundleType } from '../src/library/geometry-scalar-zero-coordinate-bundle-more';
test('zero scale coordinate bundle checks for arbitrary vectors', () =>
  check([], zeroScaleCoordinateBundleProof, zeroScaleCoordinateBundleType));
