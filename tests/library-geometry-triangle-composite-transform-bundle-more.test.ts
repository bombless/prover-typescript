import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { compositeTriangleBundleProof, compositeTriangleBundleType } from '../src/library/geometry-triangle-composite-transform-bundle-more';
test('composite transform of three triangle vertices forms one bundle', () =>
  check([], compositeTriangleBundleProof, compositeTriangleBundleType));
