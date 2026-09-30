import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translatedNormFormulaType, translatedNormFormulaProof, scaledNormFormulaType, scaledNormFormulaProof } from '../src/library/geometry-metric-parametric-laws-more';

test('translated norm formula', () => check([], translatedNormFormulaProof, translatedNormFormulaType));
test('scaled norm formula', () => check([], scaledNormFormulaProof, scaledNormFormulaType));
