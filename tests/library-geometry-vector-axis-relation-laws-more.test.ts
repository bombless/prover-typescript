import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-vector-axis-relation-laws-more';

test('cross with x axis exposes y coordinate', () => check([], c.crossXAxisProof, c.crossXAxisType));
test('cross with y axis exposes x coordinate', () => check([], c.crossYAxisProof, c.crossYAxisType));
test('dot with x axis exposes x coordinate', () => check([], c.dotXAxisProof, c.dotXAxisType));
test('dot with y axis exposes y coordinate', () => check([], c.dotYAxisProof, c.dotYAxisType));
