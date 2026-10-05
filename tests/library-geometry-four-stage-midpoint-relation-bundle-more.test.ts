import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-four-stage-midpoint-relation-bundle-more';

test('four-stage transformed midpoint shape and relations are kernel checked', () => {
  check([], c.transformedMidpointShapeProof, c.transformedMidpointShapeType);
  check([], c.transformedMidpointRelationProof, c.transformedMidpointRelationType);
});
