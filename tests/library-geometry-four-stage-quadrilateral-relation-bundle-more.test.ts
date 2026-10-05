import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-four-stage-quadrilateral-relation-bundle-more';

test('four-stage quadrilateral vertices and edge metrics are kernel checked', () => {
  check([], c.quadProof, c.quadType);
  check([], c.aNormProof, c.aNormType); check([], c.dNormProof, c.dNormType);
  check([], c.abDistanceProof, c.abDistanceType); check([], c.bcDistanceProof, c.bcDistanceType);
  check([], c.cdDistanceProof, c.cdDistanceType); check([], c.abDotProof, c.abDotType);
});

test('four-stage quadrilateral midpoint and circle relations are kernel checked', () => {
  check([], c.abMidpointProof, c.abMidpointType);
  check([], c.dCircleProof, c.dCircleType);
});
