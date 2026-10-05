import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-pentagon-vertex-projection-bundle-more-2';

test('pentagon vertex projection bundles are kernel checked', () => {
  for (const k of ['pentagonVertices', 'pentagonTail']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
