import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-quadrilateral-uniform-transform-metric-bundle-more';

test('uniformly transformed quadrilateral coordinates and norms are kernel checked', () => {
  check([], c.quadProof, c.quadType);
  check([], c.aNormProof, c.aNormType);
  check([], c.bNormProof, c.bNormType);
});

test('uniformly transformed quadrilateral edge metrics are kernel checked', () => {
  check([], c.abDistanceProof, c.abDistanceType);
  check([], c.bcDistanceProof, c.bcDistanceType);
  check([], c.abMidpointProof, c.abMidpointType);
  check([], c.abDotProof, c.abDotType);
});
