import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { displacementFormulaProof, displacementFormulaType, displacementFromZeroProof, displacementFromZeroType } from '../src/library/geometry-displacement-laws';

test('displacement square formula is kernel checked', () => check([], displacementFormulaProof, displacementFormulaType));
test('displacement from zero exposes its coordinate formula', () => check([], displacementFromZeroProof, displacementFromZeroType));
