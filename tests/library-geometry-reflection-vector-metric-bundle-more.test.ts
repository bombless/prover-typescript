import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectionVectorMetricBundleProof, reflectionVectorMetricBundleType } from '../src/library/geometry-reflection-vector-metric-bundle-more';

test('reflection vector metric bundle checks', () =>
  check([], reflectionVectorMetricBundleProof, reflectionVectorMetricBundleType));
