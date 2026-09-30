import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateTriangleFirstType, translateTriangleFirstProof, translateTriangleSecondType, translateTriangleSecondProof, rotateLineBaseType, rotateLineBaseProof, rotateLineDirectionType, rotateLineDirectionProof } from '../src/library/geometry-structure-coordinate-laws-more';

test('translated triangle first vertex expression', () => check([], translateTriangleFirstProof, translateTriangleFirstType));
test('translated triangle second vertex expression', () => check([], translateTriangleSecondProof, translateTriangleSecondType));
test('rotated line base expression', () => check([], rotateLineBaseProof, rotateLineBaseType));
test('rotated line direction projection', () => check([], rotateLineDirectionProof, rotateLineDirectionType));
