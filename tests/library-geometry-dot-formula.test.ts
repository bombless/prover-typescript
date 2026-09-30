import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { dotFormulaProof, dotFormulaType } from '../src/library/geometry-metrics';

test('dot product coordinate formula is kernel checked', () => check([], dotFormulaProof, dotFormulaType));
