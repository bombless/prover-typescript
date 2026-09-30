import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-two-point-transform-dot-cross-midpoint-bundle-more';

test('two point transformed P', () => check([], c.pProof, c.pType));
test('two point transformed Q', () => check([], c.qProof, c.qType));
test('transformed P norm', () => check([], c.pNormProof, c.pNormType));
test('transformed Q norm', () => check([], c.qNormProof, c.qNormType));
test('transformed dot product', () => check([], c.dotProof, c.dotType));
test('transformed cross product', () => check([], c.crossProof, c.crossType));
test('transformed midpoint', () => check([], c.midpointProof, c.midpointType));
test('transformed midpoint circle', () => check([], c.midpointCircleProof, c.midpointCircleType));
test('transformed P incidence', () => check([], c.pIncidenceProof, c.pIncidenceType));
