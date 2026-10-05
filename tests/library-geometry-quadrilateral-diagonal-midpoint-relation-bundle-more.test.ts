import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-quadrilateral-diagonal-midpoint-relation-bundle-more';

test('quadrilateral diagonal midpoint relations are kernel checked', () => {
  check([], c.diagonalMidpointShapeProof, c.diagonalMidpointShapeType);
  check([], c.diagonalMidpointRelationProof, c.diagonalMidpointRelationType);
  check([], c.diagonalMidpointCoordinateProof, c.diagonalMidpointCoordinateType);
});
