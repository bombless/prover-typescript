import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Type } from '../src/syntax/ast';
import { natLeBoolType, natLeTwoFiveProof, natLeTwoFiveType, natLeFiveTwoProof, natLeFiveTwoType } from '../src/library/nat-le-decision';

test('computable Nat order decision is kernel checked', () => {
  check([], natLeBoolType, Type);
  check([], natLeTwoFiveProof, natLeTwoFiveType);
  check([], natLeFiveTwoProof, natLeFiveTwoType);
});
