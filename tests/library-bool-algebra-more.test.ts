import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { andOrConcreteProof, andOrConcreteType, orAndConcreteProof, orAndConcreteType } from '../src/library/bool-algebra-more';

test('Boolean absorption branch is kernel checked', () => check([], andOrConcreteProof, andOrConcreteType));
test('Boolean mixed branch is kernel checked', () => check([], orAndConcreteProof, orAndConcreteType));
