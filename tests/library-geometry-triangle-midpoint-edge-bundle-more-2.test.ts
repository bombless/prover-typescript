import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-triangle-midpoint-edge-bundle-more-2';

test('triangle midpoint edge bundles are kernel checked', () => {
  for (const k of ['triangleMidpoints', 'firstEdgeMidpointCoordinates']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
