import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleCoordinateMetricBundleProof, triangleCoordinateMetricBundleType, triangleThirdVertexCoordinateProof, triangleThirdVertexCoordinateType } from '../src/library/geometry-triangle-coordinate-metric-bundle-more';

test('triangle coordinate metric bundle checks', () =>
  check([], triangleCoordinateMetricBundleProof, triangleCoordinateMetricBundleType));
test('triangle third vertex coordinates check', () => check([], triangleThirdVertexCoordinateProof, triangleThirdVertexCoordinateType));
