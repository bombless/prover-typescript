import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translationVectorMetricBundleProof, translationVectorMetricBundleType } from '../src/library/geometry-translation-vector-metric-bundle-more';

test('translation vector metric bundle checks', () =>
  check([], translationVectorMetricBundleProof, translationVectorMetricBundleType));
