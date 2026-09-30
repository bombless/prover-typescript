import test from 'node:test';
import { check, infer } from '../src/kernel/typecheck';
import { definitionalEqual } from '../src/kernel/reduction';
import { subSuccProof, subSuccType, subZeroProof, subZeroType } from '../src/library/sub-theorems';

test('subtraction zero equation is kernel checked for an arbitrary n', () => {
  check([], subZeroProof, subZeroType);
  if (!definitionalEqual(infer([], subZeroProof), subZeroType)) throw new Error('subZero type mismatch');
});

test('subtraction successor equation is kernel checked for arbitrary n and m', () => {
  check([], subSuccProof, subSuccType);
  if (!definitionalEqual(infer([], subSuccProof), subSuccType)) throw new Error('subSucc type mismatch');
});
