import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as b from '../src/library/bool-parametric-right-laws-more-2';

test('further parametric right Boolean laws are kernel checked', () => {
  check([], b.andRightTrueProof, b.andRightTrueType);
  check([], b.orRightFalseProof, b.orRightFalseType);
});
