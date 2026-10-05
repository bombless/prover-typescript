import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-midpoint-metric-coordinate-laws-more';

test('midpoint metric coordinate laws are kernel checked', () => {
  check([], c.midpointNormProof, c.midpointNormType);
  check([], c.midpointDotProof, c.midpointDotType);
  check([], c.midpointDistanceProof, c.midpointDistanceType);
});
