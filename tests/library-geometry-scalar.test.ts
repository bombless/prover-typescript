import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleVec, scaleVecType, scaleConcreteProof, scaleConcreteType } from '../src/library/geometry-scalar';

test('vector scalar multiplication and a concrete scaling certificate are checked', () => {
  check([], scaleVec, scaleVecType);
  check([], scaleConcreteProof, scaleConcreteType);
});
