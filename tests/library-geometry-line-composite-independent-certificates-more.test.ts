import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { movedBaseType, movedBaseProof, rotatedDirectionType, rotatedDirectionProof, reflectedDirectionType, reflectedDirectionProof, movedBaseVerticalType, movedBaseVerticalProof, baseIncidenceType, baseIncidenceProof, directionParallelType, directionParallelProof, directionPerpendicularType, directionPerpendicularProof } from '../src/library/geometry-line-composite-independent-certificates-more';

test('translated line base', () => check([], movedBaseProof, movedBaseType));
test('rotated line direction', () => check([], rotatedDirectionProof, rotatedDirectionType));
test('reflected line direction', () => check([], reflectedDirectionProof, reflectedDirectionType));
test('translated base vertical relation', () => check([], movedBaseVerticalProof, movedBaseVerticalType));
test('line base incidence', () => check([], baseIncidenceProof, baseIncidenceType));
test('line direction parallel relation', () => check([], directionParallelProof, directionParallelType));
test('line direction perpendicular relation', () => check([], directionPerpendicularProof, directionPerpendicularType));
