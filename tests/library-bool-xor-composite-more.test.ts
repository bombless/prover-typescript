import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { xorChainProof, xorChainType } from '../src/library/bool-xor';
test('composed XOR computation is kernel checked', () => check([], xorChainProof, xorChainType));
