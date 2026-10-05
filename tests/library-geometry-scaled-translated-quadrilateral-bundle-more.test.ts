import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-scaled-translated-quadrilateral-bundle-more';

test('scaled translated quadrilateral coordinates and norms are kernel checked', () => {
  check([], c.quadProof, c.quadType);
  check([], c.aNormProof, c.aNormType);
  check([], c.bNormProof, c.bNormType);
});

test('scaled translated quadrilateral edge metrics are kernel checked', () => {
  check([], c.abDistanceProof, c.abDistanceType);
  check([], c.bcDistanceProof, c.bcDistanceType);
  check([], c.abDotProof, c.abDotType);
  check([], c.abMidpointProof, c.abMidpointType);
});
