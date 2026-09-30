import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-transform-circle-line-chain-more';

test('triangle transformed point coordinates', () => check([], c.coordinateProof, c.coordinateType));
test('triangle transformed point norm', () => check([], c.normProof, c.normType));
test('triangle transformed point circle', () => check([], c.circleProof, c.circleType));
test('triangle transformed point incidence', () => check([], c.incidenceProof, c.incidenceType));
