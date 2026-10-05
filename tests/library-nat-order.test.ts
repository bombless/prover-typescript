import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Type } from '../src/syntax/ast';
import { Le, natLeReflType, natLeReflProof, natLeSuccType, natLeSuccProof, zeroLeZeroType, zeroLeZeroProof } from '../src/library/nat-order';

test('natural order relation has a kernel-checked proposition type', () => check([], Le, Type));
test('natural order has reusable reflexive and successor certificates', () => {
  check([], natLeReflProof, natLeReflType);
  check([], natLeSuccProof, natLeSuccType);
  check([], zeroLeZeroProof, zeroLeZeroType);
});
