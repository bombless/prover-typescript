import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-reflected-quadrilateral-metric-bundle-more';

test('reflected quadrilateral coordinates and metrics are kernel checked', () => {
  check([], c.quadProof, c.quadType);
  check([], c.aNormProof, c.aNormType);
  check([], c.cNormProof, c.cNormType);
  check([], c.abDistanceProof, c.abDistanceType);
  check([], c.bcDistanceProof, c.bcDistanceType);
});

test('reflected quadrilateral relations are kernel checked', () => {
  check([], c.abDotProof, c.abDotType);
  check([], c.abMidpointProof, c.abMidpointType);
  check([], c.cCircleProof, c.cCircleType);
});
