import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleCoordinateBundleProof, scaleCoordinateBundleType } from '../src/library/geometry-scale-coordinate-bundle-more';
test('scale coordinate bundle checks for arbitrary scalar and vector', () =>
  check([], scaleCoordinateBundleProof, scaleCoordinateBundleType));
