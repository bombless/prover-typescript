import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaledTriangleBundleProof, scaledTriangleBundleType } from '../src/library/geometry-triangle-scale-bundle-more';
test('three scaled triangle vertices form one certificate bundle', () =>
  check([], scaledTriangleBundleProof, scaledTriangleBundleType));
