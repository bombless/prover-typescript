import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { normAxisConcreteProof, normAxisConcreteType } from '../src/library/geometry-metrics';
test('concrete axis norm square is kernel checked', () => check([], normAxisConcreteProof, normAxisConcreteType));
