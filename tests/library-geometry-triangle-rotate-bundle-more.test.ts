import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotatedTriangleBundleProof, rotatedTriangleBundleType } from '../src/library/geometry-triangle-rotate-bundle-more';
test('three rotated triangle vertices form one certificate bundle', () =>
  check([], rotatedTriangleBundleProof, rotatedTriangleBundleType));
