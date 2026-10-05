import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-triangle-transformed-midpoint-coordinate-laws-more';

test('transformed triangle midpoint coordinate law is kernel checked', () => {
  check([], g.firstEdgeTransformedMidpointProof, g.firstEdgeTransformedMidpointType);
});
