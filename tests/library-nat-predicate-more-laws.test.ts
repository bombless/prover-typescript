import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as p from '../src/library/nat-predicate-more-laws';
test('additional Nat predicate laws are kernel checked', () => {
  check([], p.isZeroSuccFiveProof, p.isZeroSuccFiveType);
  check([], p.isZeroSuccSixProof, p.isZeroSuccSixType);
  check([], p.parityFiveProof, p.parityFiveType);
  check([], p.paritySixProof, p.paritySixType);
  check([], p.paritySevenProof, p.paritySevenType);
  check([], p.parityEightProof, p.parityEightType);
});
