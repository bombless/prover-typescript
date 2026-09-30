import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { subOneProof, subOneType } from '../src/library/sub-one';

test('subtracting one is predecessor and is kernel checked', () => check([], subOneProof, subOneType));
