import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { addLeftZeroProof, addLeftZeroType, addSuccLeftProof, addSuccLeftType } from '../src/library/nat-theorems';
import { addZeroProof, addZeroType } from '../src/library/add-zero';

test('named natural addition theorems are kernel checked', () => {
  check([], addLeftZeroProof, addLeftZeroType);
  check([], addSuccLeftProof, addSuccLeftType);
  check([], addZeroProof, addZeroType);
});
