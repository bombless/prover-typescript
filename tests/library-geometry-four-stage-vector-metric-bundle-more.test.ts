import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { fourStageVectorMetricBundleProof, fourStageVectorMetricBundleType } from '../src/library/geometry-four-stage-vector-metric-bundle-more';

test('four stage vector metric bundle checks', () =>
  check([], fourStageVectorMetricBundleProof, fourStageVectorMetricBundleType));
