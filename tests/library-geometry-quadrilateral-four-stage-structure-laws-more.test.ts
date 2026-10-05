import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-quadrilateral-four-stage-structure-laws-more';

test('four-stage transformed quadrilateral structure laws are kernel checked', () => {
  check([], c.transformedQuadrilateralEtaProof, c.transformedQuadrilateralEtaType);
  check([], c.transformedQuadrilateralFirstProof, c.transformedQuadrilateralFirstType);
  check([], c.transformedQuadrilateralFourthProof, c.transformedQuadrilateralFourthType);
});
