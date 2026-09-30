import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-midpoint-full-chain-certificates-more';

test('triangle midpoint coordinate', () => check([], c.midpointProof, c.midpointType));
test('transformed triangle midpoint coordinate', () => check([], c.transformedProof, c.transformedType));
test('transformed midpoint norm', () => check([], c.normProof, c.normType));
test('transformed midpoint circle', () => check([], c.circleProof, c.circleType));
test('transformed midpoint vertical line', () => check([], c.verticalProof, c.verticalType));
