import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { crossFormulaProof, crossFormulaType } from '../src/library/geometry-cross';

test('cross product coordinate formula is kernel checked', () => check([], crossFormulaProof, crossFormulaType));
