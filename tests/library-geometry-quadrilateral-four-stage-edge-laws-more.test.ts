import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-quadrilateral-four-stage-edge-laws-more';

test('four-stage transformed quadrilateral edge laws are kernel checked', () => {
  check([], c.edgeABDistanceProof, c.edgeABDistanceType);
  check([], c.edgeBCDotProof, c.edgeBCDotType);
  check([], c.edgeCDCrossProof, c.edgeCDCrossType);
  check([], c.edgeDADistanceProof, c.edgeDADistanceType);
});
