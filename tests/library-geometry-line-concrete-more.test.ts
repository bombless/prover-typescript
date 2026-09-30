import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { lineConcreteProof, lineConcreteType } from '../src/library/geometry-line';
test('concrete line structure is kernel checked', () => check([], lineConcreteProof, lineConcreteType));
