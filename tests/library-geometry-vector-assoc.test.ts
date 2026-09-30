import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { addVecAssocProof, addVecAssocType } from '../src/library/geometry-vectors';

test('vector addition associativity is kernel checked', () => check([], addVecAssocProof, addVecAssocType));
