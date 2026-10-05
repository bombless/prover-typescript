import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as b from '../src/library/bool-xor-laws-more';
test('additional XOR laws are kernel checked', () => {
  check([], b.xorFalseTrueProof, b.xorFalseTrueType);
  check([], b.xorTrueFalseProof, b.xorTrueFalseType);
  check([], b.xorFalseFalseProof, b.xorFalseFalseType);
  check([], b.xorTrueTrueProof, b.xorTrueTrueType);
  check([], b.xorMixedChainProof, b.xorMixedChainType);
});
