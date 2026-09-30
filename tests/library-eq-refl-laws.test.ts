import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { natReflProof, natReflType } from '../src/library/eq-refl-laws';

test('natural-number reflexivity family is kernel checked', () => check([], natReflProof, natReflType));
