import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleTranslateRotateMetricBundleProof, scaleTranslateRotateMetricBundleType } from '../src/library/geometry-scale-translate-rotate-metric-bundle-more';

test('scale translate rotate metric bundle checks', () =>
  check([], scaleTranslateRotateMetricBundleProof, scaleTranslateRotateMetricBundleType));
