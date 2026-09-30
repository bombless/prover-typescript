import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-point-transform-full-certificate-chain-more';

test('full transformed point coordinate', () => check([], c.coordinateProof, c.coordinateType));
test('full transformed point norm', () => check([], c.normProof, c.normType));
test('full transformed point circle', () => check([], c.circleProof, c.circleType));
test('full transformed point line incidence', () => check([], c.incidenceProof, c.incidenceType));
test('full transformed point vertical line', () => check([], c.verticalProof, c.verticalType));
