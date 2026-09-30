import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-rotate-translate-parametric-laws-more';

test('rotate after translate coordinate laws are kernel checked', () => {
  check([], c.rotateTranslateFstProof, c.rotateTranslateFstType);
  check([], c.rotateTranslateSndProof, c.rotateTranslateSndType);
});
test('rotate translate eta and translate rotate formula are kernel checked', () => {
  check([], c.rotateTranslateEtaProof, c.rotateTranslateEtaType);
  check([], c.translateRotatePointProof, c.translateRotatePointType);
});
