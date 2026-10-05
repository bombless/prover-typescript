import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-ten-point-endpoint-midpoint-coordinate-bundle-more';
test('ten-point endpoint midpoint coordinate bundle is kernel checked', () => {
  check([], c.endpointMidpointCoordinateProof, c.endpointMidpointCoordinateType);
});
