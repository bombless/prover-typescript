import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { slopeVector, slopeVectorType, horizontalVectorProof, horizontalVectorType } from '../src/library/geometry-line-slope';

test('discrete line direction structure is kernel checked', () => {
  check([], slopeVector, slopeVectorType);
  check([], horizontalVectorProof, horizontalVectorType);
});
