import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-reflect-all-vertex-laws-more';

test('reflected second and third vertices are kernel checked', () => {
  check([], c.reflectedSecondVertexProof, c.reflectedSecondVertexType);
  check([], c.reflectedThirdVertexProof, c.reflectedThirdVertexType);
});
test('reflected triangle shape certificate is kernel checked', () =>
  check([], c.reflectedTriangleShapeProof, c.reflectedTriangleShapeType));
