import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { xorFalseFalseProof, xorFalseFalseType, xorFalseTrueProof, xorFalseTrueType } from '../src/library/bool-xor';

test('XOR concrete false branches are kernel checked', () => {
  check([], xorFalseFalseProof, xorFalseFalseType);
  check([], xorFalseTrueProof, xorFalseTrueType);
});
