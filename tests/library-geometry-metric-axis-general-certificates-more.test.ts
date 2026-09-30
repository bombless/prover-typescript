import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { xAxisSelfDotType, xAxisSelfDotProof, yAxisSelfDotType, yAxisSelfDotProof, xAxisNormType, xAxisNormProof, yAxisNormType, yAxisNormProof } from '../src/library/geometry-metric-axis-general-certificates-more';

test('x-axis self dot certificate', () => check([], xAxisSelfDotProof, xAxisSelfDotType));
test('y-axis self dot certificate', () => check([], yAxisSelfDotProof, yAxisSelfDotType));
test('x-axis norm certificate', () => check([], xAxisNormProof, xAxisNormType));
test('y-axis norm certificate', () => check([], yAxisNormProof, yAxisNormType));
