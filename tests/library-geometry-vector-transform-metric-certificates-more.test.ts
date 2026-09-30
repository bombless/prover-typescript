import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-vector-transform-metric-certificates-more';

test('translated vector coordinates', () => check([], c.movedProof, c.movedType));
test('rotated translated vector coordinates', () => check([], c.turnedProof, c.turnedType));
test('reflected rotated vector coordinates', () => check([], c.reflectedProof, c.reflectedType));
test('rotated vector norm square', () => check([], c.turnedNormProof, c.turnedNormType));
test('reflected vector self dot product', () => check([], c.reflectedDotProof, c.reflectedDotType));
