import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { collinearConcreteProof, collinearConcreteType } from '../src/library/geometry-collinear';
test('concrete collinearity certificate is kernel checked', () => check([], collinearConcreteProof, collinearConcreteType));
