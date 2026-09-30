import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { trueAndTrueInputProof, trueAndTrueInputType, falseOrFalseInputProof, falseOrFalseInputType } from '../src/library/bool-ops';

test('additional Boolean branches are kernel checked', () => {
  check([], trueAndTrueInputProof, trueAndTrueInputType);
  check([], falseOrFalseInputProof, falseOrFalseInputType);
});
