import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as b from '../src/library/bool-xor-parametric-laws-more';

test('parametric XOR right identity and negation laws are kernel checked', () => {
  check([], b.xorRightFalseParametricProof, b.xorRightFalseParametricType);
  check([], b.xorRightTrueParametricProof, b.xorRightTrueParametricType);
});
