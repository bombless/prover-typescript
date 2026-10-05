import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-parametric-full-relation-bundle-more';

test('arbitrary-scale transformed triangle relations are kernel checked', () => {
  check([], c.parametricTriangleEtaProof, c.parametricTriangleEtaType);
  check([], c.parametricTriangleRelationProof, c.parametricTriangleRelationType);
});
