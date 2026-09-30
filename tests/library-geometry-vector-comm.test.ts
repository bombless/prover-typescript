import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { addVecCommProof, addVecCommType } from '../src/library/geometry-vectors';

test('vector addition commutativity is kernel checked', () => check([], addVecCommProof, addVecCommType));
