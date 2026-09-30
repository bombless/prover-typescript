import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointEndpointMetricsBundleProof, midpointEndpointMetricsBundleType } from '../src/library/geometry-midpoint-endpoint-metrics-bundle-more';

test('midpoint endpoint metrics bundle checks', () =>
  check([], midpointEndpointMetricsBundleProof, midpointEndpointMetricsBundleType));
