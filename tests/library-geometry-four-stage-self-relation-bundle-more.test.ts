import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-four-stage-self-relation-bundle-more';

test('four-stage transformed self relations are kernel checked', () => {
  check([], c.transformedSelfCircleProof, c.transformedSelfCircleType);
  check([], c.transformedSelfVerticalProof, c.transformedSelfVerticalType);
  check([], c.transformedSelfIncidenceProof, c.transformedSelfIncidenceType);
});
