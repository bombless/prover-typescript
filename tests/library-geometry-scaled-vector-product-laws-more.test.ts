import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-scaled-vector-product-laws-more';

test('scaled vector product laws are kernel checked', () => {
  for (const k of ['scaledDotFormula', 'scaledCrossFormula', 'zeroScaledDot', 'zeroScaledCross']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
