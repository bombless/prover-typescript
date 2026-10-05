import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-zero-relation-coordinate-bundle-more';

test('zero relation and coordinate bundles are kernel checked', () => {
  for (const k of ['zeroCross', 'zeroDot', 'zeroParallel', 'zeroPerpendicular', 'zeroProjection']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
