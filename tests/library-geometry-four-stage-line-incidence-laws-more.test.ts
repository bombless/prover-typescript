import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-four-stage-line-incidence-laws-more';

test('four-stage transformed line incidence laws are kernel checked', () => {
  check([], c.transformedVerticalProof, c.transformedVerticalType);
  check([], c.transformedIncidenceProof, c.transformedIncidenceType);
});
