import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rightTriangleBundleProof, rightTriangleBundleType } from '../src/library/geometry-right-triangle-bundle-more';
test('right triangle dot cross and length certificates bundle together', () =>
  check([], rightTriangleBundleProof, rightTriangleBundleType));
