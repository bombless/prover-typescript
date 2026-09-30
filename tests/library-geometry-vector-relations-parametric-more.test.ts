import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { crossXUnitProof, crossXUnitType, crossYUnitProof, crossYUnitType, dotXUnitProof, dotXUnitType, dotYUnitProof, dotYUnitType } from '../src/library/geometry-vector-relations-parametric-more';

test('cross with x unit exposes second coordinate', () => check([], crossXUnitProof, crossXUnitType));
test('cross with y unit exposes first coordinate', () => check([], crossYUnitProof, crossYUnitType));
test('dot with x unit exposes first coordinate', () => check([], dotXUnitProof, dotXUnitType));
test('dot with y unit exposes second coordinate', () => check([], dotYUnitProof, dotYUnitType));
