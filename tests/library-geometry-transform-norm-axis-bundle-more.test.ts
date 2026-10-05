import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-transform-norm-axis-bundle-more';

test('transform norm and axis bundles are kernel checked', () => {
  for (const k of ['rotateTranslateNormFormula', 'xAxisTranslateSnd', 'yAxisTranslateFst']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
