import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { addVecConcreteProof, addVecConcreteType, addVecSwapConcreteProof, addVecSwapConcreteType, addVecZeroConcreteProof, addVecZeroConcreteType, addVecZeroProof, addVecZeroType, addVecLeftZeroProof, addVecLeftZeroType } from '../src/library/geometry-vector-laws';

test('concrete vector addition laws are kernel checked', () => {
  check([], addVecConcreteProof, addVecConcreteType);
  check([], addVecSwapConcreteProof, addVecSwapConcreteType);
  check([], addVecZeroConcreteProof, addVecZeroConcreteType);
});
test('general vector addition right-zero identity is kernel checked', () => check([], addVecZeroProof, addVecZeroType));
test('general vector addition left-zero identity is kernel checked', () => check([], addVecLeftZeroProof, addVecLeftZeroType));
