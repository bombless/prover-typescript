import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { isZero, isZeroType, isZeroZeroProof, isZeroZeroType, isZeroSuccProof, isZeroSuccType, parity, parityType, parityZeroProof, parityZeroType } from '../src/library/nat-predicates';

test('natural predicates are kernel checked', () => {
  check([], isZeroType, { kind: 'Type' });
  check([], isZeroZeroProof, isZeroZeroType);
  check([], isZeroSuccProof, isZeroSuccType);
  check([], parityType, { kind: 'Type' });
  check([], parityZeroProof, parityZeroType);
});
