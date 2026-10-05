import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as b from '../src/library/bool-closed-laws-more';
test('additional closed Boolean laws are kernel checked', () => {
  check([], b.andTrueFalseTrueProof, b.andTrueFalseTrueType);
  check([], b.orFalseTrueProof, b.orFalseTrueType);
  check([], b.notAndProof, b.notAndType);
  check([], b.notOrProof, b.notOrType);
  check([], b.andNestedProof, b.andNestedType);
  check([], b.orNestedProof, b.orNestedType);
});
