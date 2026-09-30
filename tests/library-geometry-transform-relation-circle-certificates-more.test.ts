import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transform-relation-circle-certificates-more';

test('reflect rotate translate coordinate chain', () => check([], c.transformedCoordinateProof, c.transformedCoordinateType));
test('transformed point line incidence', () => check([], c.transformedIncidenceProof, c.transformedIncidenceType));
test('transformed point circle membership', () => check([], c.transformedCircleProof, c.transformedCircleType));
test('transformed point norm', () => check([], c.transformedNormProof, c.transformedNormType));
