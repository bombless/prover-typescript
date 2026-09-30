import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { eqReflProof, eqReflType } from '../src/library/equality-laws';

test('equality theorem remains kernel checked', () => check([], eqReflProof, eqReflType));
