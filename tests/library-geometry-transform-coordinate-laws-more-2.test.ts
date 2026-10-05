import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-transform-coordinate-laws-more-2';
test('additional transform coordinate laws are kernel checked', () => {
  check([], g.reflectRotatePointFstProof, g.reflectRotatePointFstType);
  check([], g.rotateTranslateFirstProof, g.rotateTranslateFirstType);
});
