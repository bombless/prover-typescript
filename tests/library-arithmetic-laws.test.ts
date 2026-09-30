import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { mulSuccProof, mulSuccType } from '../src/library/mul-succ';
import { powSuccProof, powSuccType } from '../src/library/pow-succ';

test('multiplication successor equation is kernel checked', () => {
  check([], mulSuccProof, mulSuccType);
});

test('power successor equation is kernel checked', () => {
  check([], powSuccProof, powSuccType);
});
