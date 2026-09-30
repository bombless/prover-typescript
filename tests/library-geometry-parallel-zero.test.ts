import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { zeroParallelProof, zeroParallelType } from '../src/library/geometry-parallel';

test('zero vector parallel relation is kernel checked', () => check([], zeroParallelProof, zeroParallelType));
