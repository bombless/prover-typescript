import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-quadrilateral-vertex-edge-bundle-more-3';

test('quadrilateral vertex and edge bundles are kernel checked', () => {
  for (const k of ['quadrilateralVertices', 'quadrilateralTail', 'quadrilateralFirstEdge']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
