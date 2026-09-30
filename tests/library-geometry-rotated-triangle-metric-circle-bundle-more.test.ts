import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-rotated-triangle-metric-circle-bundle-more';

test('rotated triangle coordinates and metrics are kernel checked', () => {
  check([], c.triangleProof, c.triangleType);
  check([], c.aNormProof, c.aNormType);
  check([], c.bNormProof, c.bNormType);
  check([], c.abDistanceProof, c.abDistanceType);
});

test('rotated triangle midpoint and circle certificates are kernel checked', () => {
  check([], c.abMidpointProof, c.abMidpointType);
  check([], c.aCircleProof, c.aCircleType);
});
