import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { swapAxisConcreteProof, swapAxisConcreteType } from '../src/library/geometry-projections';
test('concrete axis swap is kernel checked', () => check([], swapAxisConcreteProof, swapAxisConcreteType));
