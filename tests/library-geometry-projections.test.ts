import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Point2 } from '../src/library/geometry-projections';
import { swapPoint, swapPointType, swapOriginProof, swapOriginType, diagonalPoint, diagonalPointType, diagonalZeroProof, diagonalZeroType } from '../src/library/geometry-projections';

test('coordinate projections and diagonal maps are kernel checked', () => {
  check([], swapPoint, swapPointType);
  check([], swapOriginProof, swapOriginType);
  check([], diagonalPoint, diagonalPointType);
  check([], diagonalZeroProof, diagonalZeroType);
});
