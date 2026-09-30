import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { succCongrConcreteProof, succCongrConcreteType } from '../src/library/nat-congruence-more';

test('concrete successor congruence is kernel checked', () => check([], succCongrConcreteProof, succCongrConcreteType));
