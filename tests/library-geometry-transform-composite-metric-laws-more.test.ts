import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateReflectNormType, rotateReflectNormProof, translateRotateDistanceType, translateRotateDistanceProof, transformedTriangleMetricType, transformedTriangleMetricProof } from '../src/library/geometry-transform-composite-metric-laws-more';

test('rotate reflect norm metric', () => check([], rotateReflectNormProof, rotateReflectNormType));
test('translate rotate distance metric', () => check([], translateRotateDistanceProof, translateRotateDistanceType));
test('transformed triangle metric bundle', () => check([], transformedTriangleMetricProof, transformedTriangleMetricType));
