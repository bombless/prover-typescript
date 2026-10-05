import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-hexagon-vertex-projection-bundle-more-2';

test('hexagon vertex projection bundles are kernel checked', () => {
  for (const k of ['hexagonVertices', 'hexagonTail']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
