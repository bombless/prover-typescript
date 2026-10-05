import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-polygon-structure-generator-more';

test('generated polygon structures are kernel checked', () => {
  for (const k of ['undecagonFirst', 'undecagonTail', 'dodecagonFirst', 'dodecagonTail', 'fifteenFirst', 'sixteenFirst', 'twentyVertex3', 'twentyTail', 'twentyFirstTranslatedX']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
