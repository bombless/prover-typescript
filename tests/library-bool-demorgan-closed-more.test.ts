import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as b from '../src/library/bool-demorgan-closed-more';
test('closed Boolean De Morgan laws are kernel checked', () => {
  check([], b.demorganTrueFalseProof, b.demorganTrueFalseType);
  check([], b.demorganFalseTrueProof, b.demorganFalseTrueType);
  check([], b.demorganOrTrueFalseProof, b.demorganOrTrueFalseType);
  check([], b.demorganOrFalseFalseProof, b.demorganOrFalseFalseType);
  check([], b.implicationEncodingProof, b.implicationEncodingType);
  check([], b.implicationEncodingFalseProof, b.implicationEncodingFalseType);
});
