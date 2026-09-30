import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateLineStructureProof, rotateLineStructureType, translateLineStructureProof, translateLineStructureType, translateLineBaseFirstCoordinateProof, translateLineBaseFirstCoordinateType } from '../src/library/geometry-line-structure-parametric-more';

test('rotated line structure is kernel checked', () => check([], rotateLineStructureProof, rotateLineStructureType));
test('translated line structure is kernel checked', () => check([], translateLineStructureProof, translateLineStructureType));
test('translated line base first coordinate computes', () => check([], translateLineBaseFirstCoordinateProof, translateLineBaseFirstCoordinateType));
