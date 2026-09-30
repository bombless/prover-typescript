import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { parallelVecType, sameAxisProof, sameAxisType } from '../src/library/geometry-parallel';

test('parallel-vector predicate and axis certificate are kernel checked', () => {
  check([], parallelVecType, { kind: 'Type' });
  check([], sameAxisProof, sameAxisType);
});
