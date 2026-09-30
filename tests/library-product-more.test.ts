import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { nestedFstProof, nestedFstType } from '../src/library/product-laws';

test('nested product projection is kernel checked', () => check([], nestedFstProof, nestedFstType));
