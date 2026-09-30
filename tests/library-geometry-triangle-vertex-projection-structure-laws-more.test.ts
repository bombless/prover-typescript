import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-vertex-projection-structure-laws-more';

test('translated second triangle vertex law', () => check([], c.translatedSecondVertexProof, c.translatedSecondVertexType));
test('rotated third triangle vertex law', () => check([], c.rotatedThirdVertexProof, c.rotatedThirdVertexType));
