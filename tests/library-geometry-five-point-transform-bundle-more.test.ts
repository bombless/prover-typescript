import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-five-point-transform-bundle-more';

test('five transformed points are kernel checked', () => {
  check([], c.aProof, c.aType); check([], c.bProof, c.bType);
  check([], c.cProof, c.cType); check([], c.dProof, c.dType); check([], c.eProof, c.eType);
});
test('five point metric certificates are kernel checked', () => {
  check([], c.aNormProof, c.aNormType); check([], c.cNormProof, c.cNormType);
  check([], c.acDotProof, c.acDotType); check([], c.bdCrossProof, c.bdCrossType);
});
test('five point relation certificates are kernel checked', () => {
  check([], c.cCircleProof, c.cCircleType);
  check([], c.dIncidenceProof, c.dIncidenceType);
  check([], c.eVerticalProof, c.eVerticalType);
});
