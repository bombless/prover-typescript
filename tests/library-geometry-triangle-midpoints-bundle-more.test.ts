import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleMidpointsBundleProof, triangleMidpointsBundleType } from '../src/library/geometry-triangle-midpoints-bundle-more';
test('three triangle edge midpoints form one certificate bundle', () =>
  check([], triangleMidpointsBundleProof, triangleMidpointsBundleType));
