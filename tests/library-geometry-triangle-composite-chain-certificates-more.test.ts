import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-composite-chain-certificates-more';

test('composite transformed vertex A', () => check([], c.transformedAProof, c.transformedAType));
test('composite transformed vertex B', () => check([], c.transformedBProof, c.transformedBType));
test('composite transformed vertex C', () => check([], c.transformedCProof, c.transformedCType));
test('composite transformed edge AB', () => check([], c.edgeABProof, c.edgeABType));
test('composite transformed edge BC', () => check([], c.edgeBCProof, c.edgeBCType));
test('composite transformed edge CA', () => check([], c.edgeCAProof, c.edgeCAType));
test('composite transformed midpoint', () => check([], c.midpointProof, c.midpointType));
test('composite midpoint norm', () => check([], c.midpointNormProof, c.midpointNormType));
test('composite midpoint self circle', () => check([], c.midpointCircleProof, c.midpointCircleType));
