import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { addSuccTwiceProof, addSuccTwiceType } from '../src/library/nat-theorems';
import { isZeroSuccSuccProof, isZeroSuccSuccType, isZeroSuccTripleProof, isZeroSuccTripleType } from '../src/library/nat-predicates';

test('double successor addition law is kernel checked', () => check([], addSuccTwiceProof, addSuccTwiceType));
test('isZero double successor law is kernel checked', () => check([], isZeroSuccSuccProof, isZeroSuccSuccType));
test('isZero triple successor law is kernel checked', () => check([], isZeroSuccTripleProof, isZeroSuccTripleType));
