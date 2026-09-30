import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { notTrueType, notTrueProof, notFalseType, notFalseProof, trueAndFalseType, trueAndFalseProof, falseOrTrueType, falseOrTrueProof } from '../src/library/bool-more-concrete-laws';

test('not true concrete law', () => check([], notTrueProof, notTrueType));
test('not false concrete law', () => check([], notFalseProof, notFalseType));
test('true and false concrete law', () => check([], trueAndFalseProof, trueAndFalseType));
test('false or true concrete law', () => check([], falseOrTrueProof, falseOrTrueType));
