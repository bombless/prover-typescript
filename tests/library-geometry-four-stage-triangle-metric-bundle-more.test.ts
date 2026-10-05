import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-four-stage-triangle-metric-bundle-more';

test('four-stage triangle vertices and metrics are kernel checked', () => {
  check([], c.aProof, c.aType); check([], c.bProof, c.bType); check([], c.cProof, c.cType);
  check([], c.aNormProof, c.aNormType); check([], c.bNormProof, c.bNormType); check([], c.cNormProof, c.cNormType);
  check([], c.abDotProof, c.abDotType); check([], c.abCrossProof, c.abCrossType);
  check([], c.abDistanceProof, c.abDistanceType); check([], c.bcDistanceProof, c.bcDistanceType);
});

test('four-stage triangle relations are kernel checked', () => {
  check([], c.abMidpointProof, c.abMidpointType);
  check([], c.aCircleProof, c.aCircleType); check([], c.aIncidenceProof, c.aIncidenceType);
  check([], c.aVerticalProof, c.aVerticalType);
});
