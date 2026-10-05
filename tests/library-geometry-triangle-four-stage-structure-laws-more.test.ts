import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-four-stage-structure-laws-more';

test('four-stage transformed triangle structure laws are kernel checked', () => {
  check([], c.transformedTriangleEtaProof, c.transformedTriangleEtaType);
  check([], c.transformedTriangleFirstProof, c.transformedTriangleFirstType);
  check([], c.transformedTriangleSecondProof, c.transformedTriangleSecondType);
  check([], c.transformedTriangleThirdProof, c.transformedTriangleThirdType);
});
