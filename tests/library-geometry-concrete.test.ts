import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { originOnLineZero, originOnLineZeroProof, unitEqualsUnitType, unitEqualsUnitProof } from '../src/library/geometry';

test('concrete geometric relation certificate is kernel checked', () => check([], originOnLineZeroProof, originOnLineZero));
test('concrete point equality certificate is kernel checked', () => check([], unitEqualsUnitProof, unitEqualsUnitType));
