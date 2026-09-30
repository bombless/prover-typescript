import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { affineFstProof, affineFstType, affineSndProof, affineSndType } from '../src/library/geometry-affine';

test('affine coordinate projections are kernel checked', () => {
  check([], affineFstProof, affineFstType);
  check([], affineSndProof, affineSndType);
});
