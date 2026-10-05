import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-transformed-coordinate-metric-bundle-more';

test('transformed triangle coordinate metric bundle', () => check([], c.transformedTriangleCoordinateMetricProof, c.transformedTriangleCoordinateMetricType));
