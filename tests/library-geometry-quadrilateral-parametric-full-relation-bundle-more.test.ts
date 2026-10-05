import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-quadrilateral-parametric-full-relation-bundle-more';

test('arbitrary-scale transformed quadrilateral relations are kernel checked', () => {
  check([], c.parametricQuadrilateralRelationProof, c.parametricQuadrilateralRelationType);
});
