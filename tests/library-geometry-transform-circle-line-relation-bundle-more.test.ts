import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transform-circle-line-relation-bundle-more';

test('transformed point coordinates bundle', () => check([], c.qProof, c.qType));
test('transformed point circle bundle', () => check([], c.circleProof, c.circleType));
test('transformed point incidence bundle', () => check([], c.incidenceProof, c.incidenceType));
test('transformed point vertical bundle', () => check([], c.verticalProof, c.verticalType));
test('horizontal vectors parallel bundle', () => check([], c.parallelProof, c.parallelType));
test('axis vectors perpendicular bundle', () => check([], c.perpendicularProof, c.perpendicularType));
