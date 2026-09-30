import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotatedDotXUnitProof, rotatedDotXUnitType, rotatedDotYUnitProof, rotatedDotYUnitType, rotatedCrossXUnitProof, rotatedCrossXUnitType, rotatedCrossYUnitProof, rotatedCrossYUnitType } from '../src/library/geometry-rotated-relations-parametric-more';

test('rotated dot x-unit exposes original second coordinate', () => check([], rotatedDotXUnitProof, rotatedDotXUnitType));
test('rotated dot y-unit exposes original first coordinate', () => check([], rotatedDotYUnitProof, rotatedDotYUnitType));
test('rotated cross x-unit exposes original first coordinate', () => check([], rotatedCrossXUnitProof, rotatedCrossXUnitType));
test('rotated cross y-unit exposes original second coordinate', () => check([], rotatedCrossYUnitProof, rotatedCrossYUnitType));
