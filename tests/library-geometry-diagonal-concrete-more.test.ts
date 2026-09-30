import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { diagonalConcreteProof, diagonalConcreteType } from '../src/library/geometry-projections';
test('concrete diagonal swap is kernel checked', () => check([], diagonalConcreteProof, diagonalConcreteType));
