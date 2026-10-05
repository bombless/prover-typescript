import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as p from '../src/library/nat-predicate-more-laws-2';
test('further Nat predicate laws are kernel checked', () => {
  check([], p.isZeroSuccSevenProof, p.isZeroSuccSevenType);
  check([], p.isZeroSuccEightProof, p.isZeroSuccEightType);
  check([], p.parityNineProof, p.parityNineType);
  check([], p.parityTenProof, p.parityTenType);
  check([], p.parityElevenProof, p.parityElevenType);
  check([], p.parityTwelveProof, p.parityTwelveType);
});
