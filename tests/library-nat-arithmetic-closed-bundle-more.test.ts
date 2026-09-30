import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/nat-arithmetic-closed-bundle-more';

test('closed powers are kernel checked', () => {
  check([], c.powTwoThreeProof, c.powTwoThreeType);
  check([], c.powThreeTwoProof, c.powThreeTwoType);
  check([], c.powFiveZeroProof, c.powFiveZeroType);
});

test('closed subtraction and predecessor are kernel checked', () => {
  check([], c.subSevenThreeProof, c.subSevenThreeType);
  check([], c.subThreeSevenProof, c.subThreeSevenType);
  check([], c.predEightProof, c.predEightType);
});

test('nested closed arithmetic is kernel checked', () => {
  check([], c.nestedPowSubProof, c.nestedPowSubType);
  check([], c.nestedPredSubPowProof, c.nestedPredSubPowType);
  check([], c.mixedAddMulSubProof, c.mixedAddMulSubType);
});
