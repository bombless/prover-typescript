import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleCoordinateVectorBundleProof, triangleCoordinateVectorBundleType } from '../src/library/geometry-triangle-coordinate-vector-bundle-more';

test('triangle coordinate vector bundle checks', () =>
  check([], triangleCoordinateVectorBundleProof, triangleCoordinateVectorBundleType));
