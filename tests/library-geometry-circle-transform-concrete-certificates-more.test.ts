import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-circle-transform-concrete-certificates-more';

test('translated circle center coordinates', () => check([], c.movedCenterProof, c.movedCenterType));
test('rotated translated circle center coordinates', () => check([], c.turnedCenterProof, c.turnedCenterType));
test('circle radius projection', () => check([], c.radiusProjectionProof, c.radiusProjectionType));
test('transformed center norm square', () => check([], c.turnedCenterNormProof, c.turnedCenterNormType));
test('transformed center self circle membership', () => check([], c.movedSelfCircleProof, c.movedSelfCircleType));
