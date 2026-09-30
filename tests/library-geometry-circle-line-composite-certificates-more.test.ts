import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { circleLineMetricType, circleLineMetricProof } from '../src/library/geometry-circle-line-composite-certificates-more';

test('circle line metric composite certificate', () => check([], circleLineMetricProof, circleLineMetricType));
