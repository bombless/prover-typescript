import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-full-metric-transform-bundle-laws-more';

test('full metric transformed vertex A', () => check([], c.taProof, c.taType));
test('full metric transformed vertex C', () => check([], c.tcProof, c.tcType));
test('full metric transformed vertex norm', () => check([], c.taNormProof, c.taNormType));
test('full metric transformed midpoint', () => check([], c.midpointProof, c.midpointType));
