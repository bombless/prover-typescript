import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotationCoordinateBundleProof, rotationCoordinateBundleType } from '../src/library/geometry-rotation-coordinate-bundle-more';
test('rotation coordinate bundle checks for arbitrary points', () =>
  check([], rotationCoordinateBundleProof, rotationCoordinateBundleType));
