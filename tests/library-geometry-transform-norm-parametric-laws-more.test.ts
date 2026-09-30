import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transform-norm-parametric-laws-more';

test('rotated norm coordinate law', () => check([], c.rotatedNormProof, c.rotatedNormType));
test('reflected norm coordinate law', () => check([], c.reflectedNormProof, c.reflectedNormType));
test('rotated self dot coordinate law', () => check([], c.rotatedSelfDotProof, c.rotatedSelfDotType));
