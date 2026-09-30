import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { swapTwiceProof, swapTwiceType, swapInvolutionProof, swapInvolutionType } from '../src/library/geometry-projections';

test('coordinate swap twice preserves arbitrary points', () => check([], swapTwiceProof, swapTwiceType));
test('coordinate swap involution alias is kernel checked', () => check([], swapInvolutionProof, swapInvolutionType));
