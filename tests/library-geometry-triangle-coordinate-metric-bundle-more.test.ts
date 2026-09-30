import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleCoordinateMetricBundleProof, triangleCoordinateMetricBundleType } from '../src/library/geometry-triangle-coordinate-metric-bundle-more';

test('triangle coordinate metric bundle checks', () =>
  check([], triangleCoordinateMetricBundleProof, triangleCoordinateMetricBundleType));
