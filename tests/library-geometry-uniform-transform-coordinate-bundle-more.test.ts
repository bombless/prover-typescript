import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-uniform-transform-coordinate-bundle-more';

test('uniform transform coordinate bundles are kernel checked', () => {
  for (const k of ['translateCoordinates', 'rotateCoordinates', 'reflectCoordinates', 'rotateTwiceCoordinates']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
