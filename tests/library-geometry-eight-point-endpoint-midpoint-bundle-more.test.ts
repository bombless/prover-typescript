import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-eight-point-endpoint-midpoint-bundle-more';

test('eight-point endpoint midpoint bundle is kernel checked', () => {
  check([], c.endpointMidpointShapeProof, c.endpointMidpointShapeType);
  check([], c.endpointMidpointBundleProof, c.endpointMidpointBundleType);
});
