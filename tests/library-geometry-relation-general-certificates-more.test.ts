import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { xAxisParallelMoreType, xAxisParallelMoreProof, yAxisParallelMoreType, yAxisParallelMoreProof, axisPerpendicularMoreType, axisPerpendicularMoreProof } from '../src/library/geometry-relation-general-certificates-more';

test('x-axis parallel relation certificate', () => check([], xAxisParallelMoreProof, xAxisParallelMoreType));
test('y-axis parallel relation certificate', () => check([], yAxisParallelMoreProof, yAxisParallelMoreType));
test('axis perpendicular relation certificate', () => check([], axisPerpendicularMoreProof, axisPerpendicularMoreType));
