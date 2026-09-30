import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { swapConcreteProof, swapConcreteType } from '../src/library/geometry-projections';
test('larger coordinate swap is kernel checked', () => check([], swapConcreteProof, swapConcreteType));
