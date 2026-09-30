import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transform-circle-line-multi-certificates-more';

test('rotate translate point', () => check([], c.qProof, c.qType));
test('rotate translate point circle', () => check([], c.circleProof, c.circleType));
test('rotate translate point incidence', () => check([], c.incidenceProof, c.incidenceType));
test('rotate translate point vertical line', () => check([], c.verticalProof, c.verticalType));
