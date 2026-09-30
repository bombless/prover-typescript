import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-two-point-reflect-translate-relation-bundle-more';

test('reflected translated P', () => check([], c.pProof, c.pType));
test('reflected translated Q', () => check([], c.qProof, c.qType));
test('reflected translated P norm', () => check([], c.pNormProof, c.pNormType));
test('reflected translated dot', () => check([], c.dotProof, c.dotType));
test('reflected translated cross', () => check([], c.crossProof, c.crossType));
test('reflected translated midpoint', () => check([], c.midpointProof, c.midpointType));
test('reflected translated midpoint circle', () => check([], c.midpointCircleProof, c.midpointCircleType));
test('reflected translated incidence', () => check([], c.pIncidenceProof, c.pIncidenceType));
