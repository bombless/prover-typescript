import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleConcreteProof, triangleConcreteType } from '../src/library/geometry-triangle';
test('concrete triangle structure is kernel checked', () => check([], triangleConcreteProof, triangleConcreteType));
