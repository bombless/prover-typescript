import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-four-point-midpoint-circle-chain-more';

test('first midpoint', () => check([], c.m1Proof, c.m1Type));
test('second midpoint', () => check([], c.m2Proof, c.m2Type));
test('first transformed midpoint', () => check([], c.tm1Proof, c.tm1Type));
test('second transformed midpoint', () => check([], c.tm2Proof, c.tm2Type));
test('first transformed midpoint norm', () => check([], c.tm1NormProof, c.tm1NormType));
test('second transformed midpoint circle', () => check([], c.tm2CircleProof, c.tm2CircleType));
