import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { mulZeroProof, mulZeroType } from '../src/library/mul-zero';
import { powZeroProof, powZeroType } from '../src/library/pow-zero';

test('multiplication zero and concrete multiplication are kernel checked', () => {
  check([], mulZeroProof, mulZeroType);
});

test('exponentiation by zero is kernel checked', () => {
  check([], powZeroProof, powZeroType);
});
