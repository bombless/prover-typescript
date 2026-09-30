import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { distanceToZeroProof, distanceToZeroType, zeroToDistanceProof, zeroToDistanceType, distanceToXUnitProof, distanceToXUnitType, distanceToYUnitProof, distanceToYUnitType, distanceSelfProof, distanceSelfType } from '../src/library/geometry-distance-parametric-more';

test('distance to zero point reduces parametrically', () => check([], distanceToZeroProof, distanceToZeroType));
test('zero point to arbitrary point reduces parametrically', () => check([], zeroToDistanceProof, zeroToDistanceType));
test('distance to x unit exposes first coordinate', () => check([], distanceToXUnitProof, distanceToXUnitType));
test('distance to y unit exposes second coordinate', () => check([], distanceToYUnitProof, distanceToYUnitType));
test('distance self expression is kernel checked', () => check([], distanceSelfProof, distanceSelfType));
