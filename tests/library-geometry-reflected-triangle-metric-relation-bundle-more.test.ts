import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-reflected-triangle-metric-relation-bundle-more';

test('reflected triangle coordinates and metrics are kernel checked', () => {
  check([], c.triangleProof, c.triangleType);
  check([], c.aNormProof, c.aNormType);
  check([], c.bNormProof, c.bNormType);
  check([], c.abDistanceProof, c.abDistanceType);
  check([], c.bcDistanceProof, c.bcDistanceType);
});

test('reflected triangle relations are kernel checked', () => {
  check([], c.abDotProof, c.abDotType);
  check([], c.abCrossProof, c.abCrossType);
  check([], c.abMidpointProof, c.abMidpointType);
  check([], c.aCircleProof, c.aCircleType);
});
