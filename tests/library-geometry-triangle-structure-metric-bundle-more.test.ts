import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleStructureMetricBundleProof, triangleStructureMetricBundleType } from '../src/library/geometry-triangle-structure-metric-bundle-more';

test('triangle structure metric bundle checks', () =>
  check([], triangleStructureMetricBundleProof, triangleStructureMetricBundleType));
