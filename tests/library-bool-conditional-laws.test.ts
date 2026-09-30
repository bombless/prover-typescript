import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { andTrueRight, andTrueRightType, andTrueTrueProof, andTrueTrueType, orFalseRight, orFalseRightType, orFalseFalseProof, orFalseFalseType } from '../src/library/bool-conditional-laws';

test('boolean identity laws are kernel checked', () => {
  check([], andTrueRight, andTrueRightType);
  check([], andTrueTrueProof, andTrueTrueType);
  check([], orFalseRight, orFalseRightType);
  check([], orFalseFalseProof, orFalseFalseType);
});
