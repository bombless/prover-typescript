import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { emptyElimProof, emptyElimType } from '../src/library/empty-laws';

test('polymorphic empty elimination is kernel checked', () => check([], emptyElimProof, emptyElimType));
