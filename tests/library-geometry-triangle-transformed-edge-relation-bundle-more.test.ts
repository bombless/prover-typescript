import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-transformed-edge-relation-bundle-more';

test('transformed edge vertex A', () => check([], c.aProof, c.aType));
test('transformed edge vertex B', () => check([], c.bProof, c.bType));
test('transformed edge vertex C', () => check([], c.cProof, c.cType));
test('transformed edge vertex norm', () => check([], c.aNormProof, c.aNormType));
test('transformed edge dot product', () => check([], c.abDotProof, c.abDotType));
test('transformed edge cross product', () => check([], c.abCrossProof, c.abCrossType));
test('transformed edge midpoint', () => check([], c.midpointProof, c.midpointType));
test('transformed edge midpoint circle', () => check([], c.midpointCircleProof, c.midpointCircleType));
