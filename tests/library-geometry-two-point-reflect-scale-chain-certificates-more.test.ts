import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-two-point-reflect-scale-chain-certificates-more';

test('reflect scale translate point P', () => check([], c.transformedPProof, c.transformedPType));
test('reflect scale translate point Q', () => check([], c.transformedQProof, c.transformedQType));
test('transformed endpoint distance', () => check([], c.transformedDistanceProof, c.transformedDistanceType));
test('transformed midpoint coordinates', () => check([], c.transformedMidpointProof, c.transformedMidpointType));
test('transformed midpoint norm', () => check([], c.transformedMidpointNormProof, c.transformedMidpointNormType));
test('transformed midpoint circle membership', () => check([], c.transformedMidpointCircleProof, c.transformedMidpointCircleType));
test('transformed midpoint line incidence', () => check([], c.transformedMidpointIncidenceProof, c.transformedMidpointIncidenceType));
