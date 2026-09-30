import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-scale-translate-vector-parametric-more';

test('scale then translate vector formula is kernel checked', () =>
  check([], c.scaleTranslateProof, c.scaleTranslateType));
test('scale then translate coordinate projections are kernel checked', () => {
  check([], c.scaleTranslateFstProof, c.scaleTranslateFstType);
  check([], c.scaleTranslateSndProof, c.scaleTranslateSndType);
});
