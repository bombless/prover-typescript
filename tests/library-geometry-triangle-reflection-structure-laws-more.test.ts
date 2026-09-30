import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-reflection-structure-laws-more';

test('reflected triangle nested structure', () => check([], c.reflectedTriangleProof, c.reflectedTriangleType));
test('reflected triangle first vertex law', () => check([], c.reflectedFirstVertexProof, c.reflectedFirstVertexType));
