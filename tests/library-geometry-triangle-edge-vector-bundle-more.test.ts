import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-triangle-edge-vector-bundle-more';

test('triangle edge and vector bundles are kernel checked', () => {
  for (const k of ['triangleVertices', 'triangleTailReconstruction', 'triangleSecondVertexAdd']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
