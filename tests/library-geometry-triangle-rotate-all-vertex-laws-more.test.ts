import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-rotate-all-vertex-laws-more';

test('rotated second and third vertex coordinates are kernel checked', () => {
  check([], c.rotatedSecondVertexFstProof, c.rotatedSecondVertexFstType);
  check([], c.rotatedSecondVertexSndProof, c.rotatedSecondVertexSndType);
  check([], c.rotatedThirdVertexFstProof, c.rotatedThirdVertexFstType);
  check([], c.rotatedThirdVertexSndProof, c.rotatedThirdVertexSndType);
});

test('rotated triangle shape certificate is kernel checked', () =>
  check([], c.rotatedTriangleEtaProof, c.rotatedTriangleEtaType));
