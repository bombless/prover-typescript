import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as b from '../src/library/bool-parametric-right-laws-more';

test('parametric right Boolean laws are kernel checked', () => {
  check([], b.andRightFalseProof, b.andRightFalseType);
  check([], b.orRightTrueProof, b.orRightTrueType);
});
