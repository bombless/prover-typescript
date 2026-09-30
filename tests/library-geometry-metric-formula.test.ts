import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { normSqFormulaProof, normSqFormulaType } from '../src/library/geometry-metrics';

test('norm square coordinate formula is kernel checked', () => check([], normSqFormulaProof, normSqFormulaType));
