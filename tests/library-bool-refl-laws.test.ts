import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { boolReflProof, boolReflType } from '../src/library/bool-refl-laws';

test('Boolean reflexivity family is kernel checked', () => check([], boolReflProof, boolReflType));
