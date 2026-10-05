import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-nested-midpoint-relation-bundle-more';

test('nested transformed triangle midpoint relations are kernel checked', () => {
  check([], c.nestedMidpointShapeProof, c.nestedMidpointShapeType);
  check([], c.nestedMidpointRelationProof, c.nestedMidpointRelationType);
});
