import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { ifThenElse, ifThenElseType, ifTrueProof, ifTrueType, ifFalseProof, ifFalseType } from '../src/library/bool-conditionals';

test('dependent Boolean conditionals are kernel checked', () => {
  check([], ifThenElse, ifThenElseType);
  check([], ifTrueProof, ifTrueType);
  check([], ifFalseProof, ifFalseType);
});
