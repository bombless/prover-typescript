import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { boolXor, boolXorType, xorTrueFalseProof, xorTrueFalseType, xorTrueTrueProof, xorTrueTrueType } from '../src/library/bool-xor';

test('boolean xor truth-table cases are kernel checked', () => {
  check([], boolXor, boolXorType);
  check([], xorTrueFalseProof, xorTrueFalseType);
  check([], xorTrueTrueProof, xorTrueTrueType);
});
