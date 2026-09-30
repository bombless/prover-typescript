import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-midpoint-transform-composed-parametric-more';

test('translated midpoint coordinate formulas are kernel checked', () => {
  check([], c.translatedMidpointFstProof, c.translatedMidpointFstType);
  check([], c.translatedMidpointSndProof, c.translatedMidpointSndType);
});

test('rotated midpoint coordinate formulas are kernel checked', () => {
  check([], c.rotatedMidpointFstProof, c.rotatedMidpointFstType);
  check([], c.rotatedMidpointSndProof, c.rotatedMidpointSndType);
});
