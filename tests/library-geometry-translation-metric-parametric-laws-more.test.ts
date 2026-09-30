import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-translation-metric-parametric-laws-more';

test('translated norm formula is kernel checked', () => check([], c.translatedNormProof, c.translatedNormType));
test('translated dot formula is kernel checked', () => check([], c.translatedDotProof, c.translatedDotType));
test('translated cross formula is kernel checked', () => check([], c.translatedCrossProof, c.translatedCrossType));
