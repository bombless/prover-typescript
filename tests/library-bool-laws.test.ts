import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { boolNotNot, boolNotNotType, notNotTrueProof, notNotTrueType, notNotFalseProof, notNotFalseType } from '../src/library/bool-laws';

test('boolean double negation computation is kernel checked', () => {
  check([], boolNotNot, boolNotNotType);
  check([], notNotTrueProof, notNotTrueType);
  check([], notNotFalseProof, notNotFalseType);
});
