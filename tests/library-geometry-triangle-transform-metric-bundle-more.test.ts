import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleTransformMetricBundleProof, triangleTransformMetricBundleType } from '../src/library/geometry-triangle-transform-metric-bundle-more';

test('triangle transform metric bundle checks', () =>
  check([], triangleTransformMetricBundleProof, triangleTransformMetricBundleType));
