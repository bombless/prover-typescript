import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotatedAxisNormProof, rotatedAxisNormType, translatedAxisDotProof, translatedAxisDotType, rotateTranslateAxisDotProof, rotateTranslateAxisDotType } from '../src/library/geometry-metric-axis-compositions-more';

test('rotated axis norm computes', () => check([], rotatedAxisNormProof, rotatedAxisNormType));
test('translated axis dot computes', () => check([], translatedAxisDotProof, translatedAxisDotType));
test('rotated translated axis dot computes', () => check([], rotateTranslateAxisDotProof, rotateTranslateAxisDotType));
