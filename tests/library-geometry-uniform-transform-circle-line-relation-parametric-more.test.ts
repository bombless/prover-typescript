import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-uniform-transform-circle-line-relation-parametric-more';

test('uniform transform point and relation formulas are kernel checked', () => {
  check([], c.transformedPointProof, c.transformedPointType);
  check([], c.transformedVerticalProof, c.transformedVerticalType);
  check([], c.transformedIncidenceProof, c.transformedIncidenceType);
});

test('uniform transform circle and line structures are kernel checked', () => {
  check([], c.transformedCircleProof, c.transformedCircleType);
  check([], c.transformedLineProof, c.transformedLineType);
});
