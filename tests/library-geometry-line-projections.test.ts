import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { verticalLineFstProof, verticalLineFstType } from '../src/library/geometry-line';

test('vertical line coordinate projection is kernel checked', () => check([], verticalLineFstProof, verticalLineFstType));
