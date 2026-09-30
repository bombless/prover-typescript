import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { edge12MetricType, edge12MetricProof, edge23MetricType, edge23MetricProof, rotatedVertexNormType, rotatedVertexNormProof } from '../src/library/geometry-triangle-metric-coordinate-laws-more';

test('triangle first edge metric expression', () => check([], edge12MetricProof, edge12MetricType));
test('triangle second edge metric expression', () => check([], edge23MetricProof, edge23MetricType));
test('rotated triangle vertex norm expression', () => check([], rotatedVertexNormProof, rotatedVertexNormType));
