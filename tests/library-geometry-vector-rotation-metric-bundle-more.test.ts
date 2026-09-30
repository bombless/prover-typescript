import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { vectorRotationMetricBundleProof, vectorRotationMetricBundleType } from '../src/library/geometry-vector-rotation-metric-bundle-more';

test('vector rotation metric bundle checks', () =>
  check([], vectorRotationMetricBundleProof, vectorRotationMetricBundleType));
