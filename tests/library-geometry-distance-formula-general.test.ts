import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { distanceFormulaProof, distanceFormulaType } from '../src/library/geometry-distance';

test('general distance-square formula is kernel checked', () => check([], distanceFormulaProof, distanceFormulaType));
