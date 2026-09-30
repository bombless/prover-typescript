import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { xorTrueFalseProof, xorTrueFalseType } from '../src/library/bool-xor';

test('Boolean xor concrete branch is kernel checked', () => check([], xorTrueFalseProof, xorTrueFalseType));
