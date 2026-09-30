import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { mulConcreteProof, mulConcreteType, mulNestedProof, mulNestedType, powConcreteProof, powConcreteType, powMulCompositionProof, powMulCompositionType, mulZeroRightProof, mulZeroRightType } from '../src/library/nat-arithmetic-more';

test('concrete multiplication computes', () => check([], mulConcreteProof, mulConcreteType));
test('nested multiplication computes', () => check([], mulNestedProof, mulNestedType));
test('concrete power computes', () => check([], powConcreteProof, powConcreteType));
test('power and multiplication compose by reduction', () => check([], powMulCompositionProof, powMulCompositionType));
test('multiplication by zero computes', () => check([], mulZeroRightProof, mulZeroRightType));
