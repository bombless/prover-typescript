import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-vector-invariant-chain-certificates-more';

test('vector translation chain', () => check([], c.translatedProof, c.translatedType));
test('vector rotation chain', () => check([], c.rotatedProof, c.rotatedType));
test('vector reflection chain', () => check([], c.reflectedProof, c.reflectedType));
test('rotated vector norm', () => check([], c.rotatedNormProof, c.rotatedNormType));
test('reflected vector dot invariant', () => check([], c.reflectedDotProof, c.reflectedDotType));
