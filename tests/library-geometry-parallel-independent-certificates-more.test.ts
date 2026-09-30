import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { xAxisParallelType, xAxisParallelProof, yAxisParallelType, yAxisParallelProof, zeroParallelType, zeroParallelProof } from '../src/library/geometry-parallel-independent-certificates-more';

test('x-axis parallel checks', () => check([], xAxisParallelProof, xAxisParallelType));
test('y-axis parallel checks', () => check([], yAxisParallelProof, yAxisParallelType));
test('zero parallel checks', () => check([], zeroParallelProof, zeroParallelType));
