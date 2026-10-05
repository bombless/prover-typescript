import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-quadrilateral-uniform-transform-relation-bundle-more';

test('uniform quadrilateral cross, dot, and norm certificates are kernel checked', () => {
  check([], c.acCrossProof, c.acCrossType);
  check([], c.acDotProof, c.acDotType);
  check([], c.aNormProof, c.aNormType);
});

test('uniform quadrilateral circle and line relations are kernel checked', () => {
  check([], c.cCircleProof, c.cCircleType);
  check([], c.bIncidenceProof, c.bIncidenceType);
  check([], c.aVerticalProof, c.aVerticalType);
});
