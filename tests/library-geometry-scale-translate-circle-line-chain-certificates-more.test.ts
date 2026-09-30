import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-scale-translate-circle-line-chain-certificates-more';

test('scale translate point coordinates', () => check([], c.pointProof, c.pointType));
test('scale translate point norm', () => check([], c.normProof, c.normType));
test('scale translate point self circle', () => check([], c.circleProof, c.circleType));
test('scale translate point line incidence', () => check([], c.incidenceProof, c.incidenceType));
