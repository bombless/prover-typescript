import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-midpoint-transform-metric-certificates-more';

test('translated midpoint coordinates', () => check([], c.shiftedMidpointProof, c.shiftedMidpointType));
test('rotated translated midpoint coordinates', () => check([], c.turnedMidpointProof, c.turnedMidpointType));
test('rotated midpoint is on vertical line', () => check([], c.turnedMidpointVerticalProof, c.turnedMidpointVerticalType));
test('rotated midpoint norm square', () => check([], c.turnedMidpointNormProof, c.turnedMidpointNormType));
