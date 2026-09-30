import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { boolNot, boolNotType, notTrueProof, notTrueType, notFalseProof, notFalseType, boolId, boolIdType, boolIdTrueProof, boolIdTrueType, boolIdFalseProof, boolIdFalseType } from '../src/library/bool';

test('Bool and Boolean recursion are kernel checked', () => {
  check([], boolNot, boolNotType);
  check([], notTrueProof, notTrueType);
  check([], notFalseProof, notFalseType);
  check([], boolId, boolIdType);
  check([], boolIdTrueProof, boolIdTrueType);
  check([], boolIdFalseProof, boolIdFalseType);
});
