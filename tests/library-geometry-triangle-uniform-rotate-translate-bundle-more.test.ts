import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-uniform-rotate-translate-bundle-more';

test('uniform rotate translate vertex A', () => check([], c.aProof, c.aType));
test('uniform rotate translate vertex B', () => check([], c.bProof, c.bType));
test('uniform rotate translate vertex C', () => check([], c.cProof, c.cType));
test('uniform transformed A norm', () => check([], c.aNormProof, c.aNormType));
test('uniform transformed B norm', () => check([], c.bNormProof, c.bNormType));
test('uniform transformed C norm', () => check([], c.cNormProof, c.cNormType));
test('uniform transformed triangle structure', () => check([], c.triangleProof, c.triangleType));
