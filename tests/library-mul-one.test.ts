import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { oneMulProof, oneMulType, oneMulSevenProof, oneMulSevenType, mulOneProof, mulOneType } from '../src/library/mul-one';

test('one times n reuses add-zero and is kernel checked', () => check([], oneMulProof, oneMulType));
test('closed one multiplication is kernel checked', () => check([], oneMulSevenProof, oneMulSevenType));
test('multiplication by one is kernel checked', () => check([], mulOneProof, mulOneType));
