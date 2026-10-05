import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-scale-rotate-translate-coordinate-bundle-more';

test('scale rotate translate coordinate formulas are kernel checked', () => {
  for (const k of ['scaleRotateTranslate', 'scaleRotateTranslateFst', 'scaleRotateTranslateSnd']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
