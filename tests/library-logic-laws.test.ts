import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { identityProof, identityType } from '../src/library/propositional';

test('logical identity remains kernel checked', () => check([], identityProof, identityType));
