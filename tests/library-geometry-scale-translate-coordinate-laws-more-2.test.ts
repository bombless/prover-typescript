import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-scale-translate-coordinate-laws-more-2';

test('scale then translate coordinate laws are kernel checked', () => {
  check([], g.scaleTranslateFstProof, g.scaleTranslateFstType);
  check([], g.scaleTranslateSndProof, g.scaleTranslateSndType);
});
