import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-four-stage-edge-metric-laws-more';

test('four-stage transformed triangle edge metrics are kernel checked', () => {
  check([], c.firstEdgeDistanceProof, c.firstEdgeDistanceType);
  check([], c.secondEdgeDotProof, c.secondEdgeDotType);
  check([], c.closingEdgeCrossProof, c.closingEdgeCrossType);
});
