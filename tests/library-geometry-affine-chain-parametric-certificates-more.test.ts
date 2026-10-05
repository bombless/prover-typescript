import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-affine-chain-parametric-certificates-more';

test('complete rotate scale translate point formula', () => check([], c.rotateScaleTranslatePointProof, c.rotateScaleTranslatePointType));
test('reflection after translation structural law', () => check([], c.reflectTranslatePointProof, c.reflectTranslatePointType));
test('complete rotate scale translate coordinate formulas', () => {
  check([], c.rotateScaleTranslateFstProof, c.rotateScaleTranslateFstType);
  check([], c.rotateScaleTranslateSndProof, c.rotateScaleTranslateSndType);
});
