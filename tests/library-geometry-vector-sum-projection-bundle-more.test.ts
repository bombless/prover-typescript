import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { vectorSumProjectionBundleProof, vectorSumProjectionBundleType } from '../src/library/geometry-vector-sum-projection-bundle-more';
test('vector sum projections and norm bundle checks', () =>
  check([], vectorSumProjectionBundleProof, vectorSumProjectionBundleType));
