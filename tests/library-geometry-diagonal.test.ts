import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { diagonalSwapProof, diagonalSwapType } from '../src/library/geometry-projections';

test('coordinate swap preserves every diagonal point', () => check([], diagonalSwapProof, diagonalSwapType));
