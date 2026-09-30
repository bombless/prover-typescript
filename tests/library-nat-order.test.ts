import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Type } from '../src/syntax/ast';
import { Le } from '../src/library/nat-order';

test('natural order relation has a kernel-checked proposition type', () => check([], Le, Type));
