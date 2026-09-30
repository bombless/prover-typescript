import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateConcreteProof, rotateConcreteType } from '../src/library/geometry-rotations';
import { reflectConcreteProof, reflectConcreteType } from '../src/library/geometry-reflections';

test('concrete coordinate transformations are kernel checked', () => {
  check([], rotateConcreteProof, rotateConcreteType);
  check([], reflectConcreteProof, reflectConcreteType);
});
