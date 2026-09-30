import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { boolCaseIdentityProof, boolCaseIdentityType } from '../src/library/bool-case-laws';

test('Boolean case identity is kernel checked', () => check([], boolCaseIdentityProof, boolCaseIdentityType));
