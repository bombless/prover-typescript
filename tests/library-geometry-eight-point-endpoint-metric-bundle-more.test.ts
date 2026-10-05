import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-eight-point-endpoint-metric-bundle-more';

test('endpoint metric bundle is kernel checked', () => {
  check([], c.endpointMetricProof, c.endpointMetricType);
});
