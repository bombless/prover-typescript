import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-invariant-composite-bundle-laws-more';

test('rotated triangle vertex A', () => check([], c.rotatedAVertexProof, c.rotatedAVertexType));
test('rotated triangle vertex B', () => check([], c.rotatedBVertexProof, c.rotatedBVertexType));
test('rotated triangle vertex C', () => check([], c.rotatedCVertexProof, c.rotatedCVertexType));
test('rotated triangle norm', () => check([], c.rotatedANormProof, c.rotatedANormType));
test('rotated triangle dot', () => check([], c.rotatedDotProof, c.rotatedDotType));
test('rotated triangle cross', () => check([], c.rotatedCrossProof, c.rotatedCrossType));
test('reflected triangle norm', () => check([], c.reflectedCNormProof, c.reflectedCNormType));
