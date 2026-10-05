import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-four-stage-relation-bundle-more';

test('four-stage transformed triangle relation bundle is kernel checked', () => {
  check([], c.transformedTriangleRelationsProof, c.transformedTriangleRelationsType);
});
