import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { natEq, natEqType, natEqZeroZeroProof, natEqZeroZeroType, natLeZeroProof, natLeZeroType } from '../src/library/nat-comparison';

test('natural equality decision skeleton is kernel checked', () => {
  check([], natEqType, { kind: 'Type' });
  check([], natEqZeroZeroProof, natEqZeroZeroType);
  check([], natLeZeroProof, natLeZeroType);
});
