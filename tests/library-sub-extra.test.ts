import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { subThreeProof, subThreeType, subTwoProof, subTwoType } from '../src/library/sub-theorems';

test('subtraction by two is kernel checked', () => check([], subTwoProof, subTwoType));
test('subtraction by three is kernel checked', () => check([], subThreeProof, subThreeType));
