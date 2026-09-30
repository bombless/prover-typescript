import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-vector-metric-relation-bundle-more';

test('vector self-dot and norm formula are kernel checked', () => {
  check([], c.selfDotNormProof, c.selfDotNormType);
  check([], c.normCoordinateProof, c.normCoordinateType);
});

test('vector cross formula is kernel checked', () => check([], c.crossCoordinateProof, c.crossCoordinateType));

test('zero vector metric bundle is kernel checked', () => check([], c.zeroMetricBundleProof, c.zeroMetricBundleType));
