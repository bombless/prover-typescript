import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateConcreteProof, translateConcreteType } from '../src/library/geometry-transform';
test('concrete translation is kernel checked', () => check([], translateConcreteProof, translateConcreteType));
