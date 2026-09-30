import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { boolIfFalseProof, boolIfFalseType, boolIfTrueProof, boolIfTrueType } from '../src/library/bool-conditional-laws-extra';

test('Boolean recursion true branch is kernel checked', () => check([], boolIfTrueProof, boolIfTrueType));
test('Boolean recursion false branch is kernel checked', () => check([], boolIfFalseProof, boolIfFalseType));
