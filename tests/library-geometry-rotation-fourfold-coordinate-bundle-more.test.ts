import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotationTwiceCoordinateBundleProof, rotationTwiceCoordinateBundleType } from '../src/library/geometry-rotation-fourfold-coordinate-bundle-more';
test('double rotation coordinate bundle checks for arbitrary points', () =>
  check([], rotationTwiceCoordinateBundleProof, rotationTwiceCoordinateBundleType));
