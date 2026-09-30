import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { mixedArithmeticProof, mixedArithmeticType, powerDifferenceProof, powerDifferenceType, nestedArithmeticProof, nestedArithmeticType, succPredConcreteProof, succPredConcreteType } from '../src/library/nat-arithmetic-compositions-more';

test('mixed arithmetic expression computes', () => check([], mixedArithmeticProof, mixedArithmeticType));
test('power difference computes', () => check([], powerDifferenceProof, powerDifferenceType));
test('nested arithmetic expression computes', () => check([], nestedArithmeticProof, nestedArithmeticType));
test('closed beta arithmetic expression computes', () => check([], succPredConcreteProof, succPredConcreteType));
