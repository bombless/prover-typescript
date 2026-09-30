import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { sameX, sameXType, sameY, sameYType, originSameXProof, originSameXType, originSameYProof, originSameYType } from '../src/library/geometry-coordinate-eq';

test('coordinate equality predicates are kernel checked', () => {
  check([], sameX, sameXType);
  check([], sameY, sameYType);
  check([], originSameXProof, originSameXType);
  check([], originSameYProof, originSameYType);
});
