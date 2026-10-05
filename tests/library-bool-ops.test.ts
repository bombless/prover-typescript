import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { boolAnd, boolAndType, boolOr, boolOrType, trueAndTrueProof, trueAndTrueType, falseAndTrueProof, falseAndTrueType, falseOrFalseProof, falseOrFalseType, trueOrFalseProof, trueOrFalseType, trueAndFalseProof, trueAndFalseType, falseOrTrueProof, falseOrTrueType, falseAndFalseProof, falseAndFalseType, trueOrTrueProof, trueOrTrueType, andOrMixedProof, andOrMixedType, orAndMixedProof, orAndMixedType } from '../src/library/bool-ops';

test('boolean conjunction and disjunction are kernel checked', () => {
  check([], boolAnd, boolAndType);
  check([], boolOr, boolOrType);
  check([], trueAndTrueProof, trueAndTrueType);
  check([], falseAndTrueProof, falseAndTrueType);
  check([], falseOrFalseProof, falseOrFalseType);
  check([], trueOrFalseProof, trueOrFalseType);
  check([], trueAndFalseProof, trueAndFalseType);
  check([], falseOrTrueProof, falseOrTrueType);
  check([], falseAndFalseProof, falseAndFalseType);
  check([], trueOrTrueProof, trueOrTrueType);
  check([], andOrMixedProof, andOrMixedType);
  check([], orAndMixedProof, orAndMixedType);
});
