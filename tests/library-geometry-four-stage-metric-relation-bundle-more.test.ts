import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-four-stage-metric-relation-bundle-more';

test('four-stage transformed vectors and metrics are kernel checked', () => {
  check([], c.uProof, c.uType); check([], c.vProof, c.vType);
  check([], c.uNormProof, c.uNormType); check([], c.vNormProof, c.vNormType);
  check([], c.uvDotProof, c.uvDotType); check([], c.uvCrossProof, c.uvCrossType);
  check([], c.uvDistanceProof, c.uvDistanceType);
});

test('four-stage transformed point relations are kernel checked', () => {
  check([], c.uvMidpointProof, c.uvMidpointType);
  check([], c.uCircleProof, c.uCircleType);
  check([], c.uIncidenceProof, c.uIncidenceType);
  check([], c.uVerticalProof, c.uVerticalType);
});
