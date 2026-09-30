import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { andRightTrueProof, andRightTrueType, orRightFalseProof, orRightFalseType } from '../src/library/bool-ops';

test('Boolean right identity laws are kernel checked', () => {
  check([], andRightTrueProof, andRightTrueType);
  check([], orRightFalseProof, orRightFalseType);
});
