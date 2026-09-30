import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { vectorAddCoordinateBundleProof, vectorAddCoordinateBundleType } from '../src/library/geometry-vector-add-coordinate-bundle-more';
test('vector addition coordinate bundle checks parametrically', () =>
  check([], vectorAddCoordinateBundleProof, vectorAddCoordinateBundleType));
