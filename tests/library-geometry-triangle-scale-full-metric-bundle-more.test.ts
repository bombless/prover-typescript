import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleScaleFullMetricBundleProof, triangleScaleFullMetricBundleType } from '../src/library/geometry-triangle-scale-full-metric-bundle-more';

test('triangle scale full metric bundle checks', () =>
  check([], triangleScaleFullMetricBundleProof, triangleScaleFullMetricBundleType));
