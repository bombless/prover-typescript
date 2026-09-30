import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { concreteAreaProof, concreteAreaType } from '../src/library/geometry-area';
test('concrete area certificate is kernel checked', () => check([], concreteAreaProof, concreteAreaType));
