import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { parityOneProof, parityOneType, parityTwoProof, parityTwoType } from '../src/library/nat-predicates';

test('concrete parity computations are kernel checked', () => {
  check([], parityOneProof, parityOneType);
  check([], parityTwoProof, parityTwoType);
});
