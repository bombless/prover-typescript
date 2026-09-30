import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import {
  addSevenFiveProof, addSevenFiveType, mulFourSixProof, mulFourSixType,
  powTwoFiveProof, powTwoFiveType, nestedArithmeticProof, nestedArithmeticType,
  successorConcreteProof, successorConcreteType,
  addConcreteCommProof, addConcreteCommType, mulConcreteCommProof, mulConcreteCommType,
  zeroAddConcreteProof, zeroAddConcreteType, mulByZeroConcreteProof, mulByZeroConcreteType,
  powOneConcreteProof, powOneConcreteType,
} from '../src/library/arithmetic-examples';

test('closed addition certificate is kernel checked', () => check([], addSevenFiveProof, addSevenFiveType));
test('closed multiplication certificate is kernel checked', () => check([], mulFourSixProof, mulFourSixType));
test('closed power certificate is kernel checked', () => check([], powTwoFiveProof, powTwoFiveType));
test('nested arithmetic certificate is kernel checked', () => check([], nestedArithmeticProof, nestedArithmeticType));
test('successor computation certificate is kernel checked', () => check([], successorConcreteProof, successorConcreteType));
test('concrete addition commutativity certificate is kernel checked', () => check([], addConcreteCommProof, addConcreteCommType));
test('concrete multiplication commutativity certificate is kernel checked', () => check([], mulConcreteCommProof, mulConcreteCommType));
test('concrete zero addition certificate is kernel checked', () => check([], zeroAddConcreteProof, zeroAddConcreteType));
test('concrete multiplication by zero certificate is kernel checked', () => check([], mulByZeroConcreteProof, mulByZeroConcreteType));
test('concrete first power certificate is kernel checked', () => check([], powOneConcreteProof, powOneConcreteType));
