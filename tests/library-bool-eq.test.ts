import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { boolEq, boolEqType, trueEqTrueProof, trueEqTrueType, trueEqFalseProof, trueEqFalseType } from '../src/library/bool-eq';

test('boolean equality decision procedure is kernel checked', () => {
  check([], boolEq, boolEqType);
  check([], trueEqTrueProof, trueEqTrueType);
  check([], trueEqFalseProof, trueEqFalseType);
});
