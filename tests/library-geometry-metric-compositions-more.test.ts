import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaledSumNormProof, scaledSumNormType, translatedScaledDotProof, translatedScaledDotType, nestedMetricProof, nestedMetricType } from '../src/library/geometry-metric-compositions-more';

test('scaled vector sum norm computes', () => check([], scaledSumNormProof, scaledSumNormType));
test('translated scaled vector dot computes', () => check([], translatedScaledDotProof, translatedScaledDotType));
test('nested metric expression computes', () => check([], nestedMetricProof, nestedMetricType));
