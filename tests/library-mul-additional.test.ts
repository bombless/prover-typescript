import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { mulRightZeroProof, mulRightZeroType, mulTwoConcreteProof, mulTwoConcreteType, mulTwoSuccProof, mulTwoSuccType } from '../src/library/mul-additional';

test('multiplication right zero is kernel checked', () => check([], mulRightZeroProof, mulRightZeroType));
test('closed multiplication by two is kernel checked', () => check([], mulTwoConcreteProof, mulTwoConcreteType));
test('fixed-factor successor multiplication unfolds', () => check([], mulTwoSuccProof, mulTwoSuccType));
