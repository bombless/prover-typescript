import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { affineConcreteProof, affineConcreteType } from '../src/library/geometry-affine';
test('concrete affine combination is kernel checked', () => check([], affineConcreteProof, affineConcreteType));
