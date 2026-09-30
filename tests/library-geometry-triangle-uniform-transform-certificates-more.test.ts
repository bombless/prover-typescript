import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-uniform-transform-certificates-more';

test('uniform transformed triangle vertex A', () => check([], c.aProof, c.aType));
test('uniform transformed triangle vertex B', () => check([], c.bProof, c.bType));
test('uniform transformed triangle vertex C', () => check([], c.cProof, c.cType));
test('uniform transformed triangle A norm', () => check([], c.aNormProof, c.aNormType));
test('uniform transformed triangle B norm', () => check([], c.bNormProof, c.bNormType));
