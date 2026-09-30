import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { xorRightFalseProof, xorRightFalseType, xorRightTrueProof, xorRightTrueType, xorNestedProof, xorNestedType } from '../src/library/bool-xor-parametric-more';

test('XOR right false identity is kernel checked', () => check([], xorRightFalseProof, xorRightFalseType));
test('XOR right true case law is kernel checked', () => check([], xorRightTrueProof, xorRightTrueType));
test('nested XOR computes', () => check([], xorNestedProof, xorNestedType));
