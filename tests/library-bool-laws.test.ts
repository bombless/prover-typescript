import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { boolNotNot, boolNotNotType, notNotTrueProof, notNotTrueType, notNotFalseProof, notNotFalseType, notTrueProof, notTrueType, notFalseProof, notFalseType, notNotConcreteChainProof, notNotConcreteChainType } from '../src/library/bool-laws';

test('boolean double negation computation is kernel checked', () => {
  check([], boolNotNot, boolNotNotType);
  check([], notNotTrueProof, notNotTrueType);
  check([], notNotFalseProof, notNotFalseType);
  check([], notTrueProof, notTrueType);
  check([], notFalseProof, notFalseType);
  check([], notNotConcreteChainProof, notNotConcreteChainType);
});
