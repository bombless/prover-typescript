import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-affine-configuration-bundle-more-2';

test('affine configuration certificates are kernel checked', () => {
  check([], g.pCoordinateProof, g.pCoordinateType);
  check([], g.pNormProof, g.pNormType);
  check([], g.pCircleProof, g.pCircleType);
  check([], g.pVerticalProof, g.pVerticalType);
  check([], g.pIncidenceProof, g.pIncidenceType);
  check([], g.qCoordinateProof, g.qCoordinateType);
  check([], g.qNormProof, g.qNormType);
  check([], g.qCircleProof, g.qCircleType);
  check([], g.qVerticalProof, g.qVerticalType);
  check([], g.qIncidenceProof, g.qIncidenceType);
});
