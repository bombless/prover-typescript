import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-translated-metric-bundle-more';

test('translated triangle coordinates and norms are kernel checked', () => {
  check([], c.triangleProof, c.triangleType);
  check([], c.aNormProof, c.aNormType);
  check([], c.bNormProof, c.bNormType);
  check([], c.cNormProof, c.cNormType);
});

test('translated triangle edge and midpoint metrics are kernel checked', () => {
  check([], c.abDistanceProof, c.abDistanceType);
  check([], c.bcDistanceProof, c.bcDistanceType);
  check([], c.abMidpointProof, c.abMidpointType);
  check([], c.bcMidpointProof, c.bcMidpointType);
});
