import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaledToZeroProof, scaledToZeroType, rotatedXUnitProof, rotatedXUnitType, rotatedYUnitProof, rotatedYUnitType } from '../src/library/geometry-distance-transform-parametric-more';

test('scaled point to zero distance reduces', () => check([], scaledToZeroProof, scaledToZeroType));
test('rotated point x-unit distance exposes y coordinate', () => check([], rotatedXUnitProof, rotatedXUnitType));
test('rotated point y-unit distance exposes x coordinate', () => check([], rotatedYUnitProof, rotatedYUnitType));
