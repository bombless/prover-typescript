import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { succCongrProof, succCongrType } from '../src/library/nat-congruence';

test('successor congruence is kernel checked', () => check([], succCongrProof, succCongrType));
