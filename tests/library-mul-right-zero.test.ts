import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { mulRightZeroProof, mulRightZeroType } from '../src/library/mul-right-zero';

test('right multiplication by zero is proved by induction', () => check([], mulRightZeroProof, mulRightZeroType));
