import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { falseAndProof, falseAndType, falseOrProof, falseOrType, trueAndProof, trueAndType, trueOrProof, trueOrType } from '../src/library/bool-ops';

test('generic Boolean and/or branch laws are kernel checked', () => {
  check([], trueAndProof, trueAndType);
  check([], falseAndProof, falseAndType);
  check([], falseOrProof, falseOrType);
  check([], trueOrProof, trueOrType);
});
