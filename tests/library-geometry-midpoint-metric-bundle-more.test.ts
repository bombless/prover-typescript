import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointMetricBundleProof, midpointMetricBundleType } from '../src/library/geometry-midpoint-metric-bundle-more';

test('midpoint metric bundle checks', () =>
  check([], midpointMetricBundleProof, midpointMetricBundleType));
