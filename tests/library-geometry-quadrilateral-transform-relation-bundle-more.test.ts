import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-quadrilateral-transform-relation-bundle-more';

test('quadrilateral transformed P', () => check([], c.pProof, c.pType));
test('quadrilateral transformed Q', () => check([], c.qProof, c.qType));
test('quadrilateral transformed R', () => check([], c.rProof, c.rType));
test('quadrilateral transformed S', () => check([], c.sProof, c.sType));
test('quadrilateral P norm', () => check([], c.pNormProof, c.pNormType));
test('quadrilateral Q norm', () => check([], c.qNormProof, c.qNormType));
test('quadrilateral PQ dot', () => check([], c.pqDotProof, c.pqDotType));
test('quadrilateral PQ cross', () => check([], c.pqCrossProof, c.pqCrossType));
test('quadrilateral midpoint', () => check([], c.midpointProof, c.midpointType));
test('quadrilateral midpoint circle', () => check([], c.midpointCircleProof, c.midpointCircleType));
test('quadrilateral Q incidence', () => check([], c.qIncidenceProof, c.qIncidenceType));
test('quadrilateral R vertical line', () => check([], c.rVerticalProof, c.rVerticalType));
