import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-scaled-rotated-triangle-bundle-more';

test('scaled rotated triangle coordinates and norms are kernel checked', () => {
  check([], c.triangleProof, c.triangleType);
  check([], c.aNormProof, c.aNormType);
  check([], c.bNormProof, c.bNormType);
});

test('scaled rotated triangle edge metrics are kernel checked', () => {
  check([], c.abDistanceProof, c.abDistanceType);
  check([], c.abDotProof, c.abDotType);
  check([], c.abMidpointProof, c.abMidpointType);
});
