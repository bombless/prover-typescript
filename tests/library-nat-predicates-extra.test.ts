import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { isZeroSuccProof, isZeroSuccType } from '../src/library/nat-predicates';

test('isZero successor equation is kernel checked', () => check([], isZeroSuccProof, isZeroSuccType));
