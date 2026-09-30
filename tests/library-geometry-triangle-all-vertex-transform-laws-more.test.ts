import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-all-vertex-transform-laws-more';

test('translated second and third vertex coordinates are kernel checked', () => {
  check([], c.translatedSecondVertexFstProof, c.translatedSecondVertexFstType);
  check([], c.translatedSecondVertexSndProof, c.translatedSecondVertexSndType);
  check([], c.translatedThirdVertexFstProof, c.translatedThirdVertexFstType);
  check([], c.translatedThirdVertexSndProof, c.translatedThirdVertexSndType);
});

test('rotated first vertex coordinates are kernel checked', () => {
  check([], c.rotatedFirstVertexFstProof, c.rotatedFirstVertexFstType);
  check([], c.rotatedFirstVertexSndProof, c.rotatedFirstVertexSndType);
});
