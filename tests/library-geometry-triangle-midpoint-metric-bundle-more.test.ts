import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleMidpointMetricBundleProof, triangleMidpointMetricBundleType } from '../src/library/geometry-triangle-midpoint-metric-bundle-more';

test('triangle midpoint metric bundle checks', () =>
  check([], triangleMidpointMetricBundleProof, triangleMidpointMetricBundleType));
