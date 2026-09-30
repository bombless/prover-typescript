import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleCircleMetricBundleProof, scaleCircleMetricBundleType } from '../src/library/geometry-scale-circle-metric-bundle-more';

test('scale circle metric bundle checks', () =>
  check([], scaleCircleMetricBundleProof, scaleCircleMetricBundleType));
