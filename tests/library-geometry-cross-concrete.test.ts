import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { crossAxisConcreteProof, crossAxisConcreteType } from '../src/library/geometry-cross';
test('concrete cross expression with zero coordinate is kernel checked', () => check([], crossAxisConcreteProof, crossAxisConcreteType));
