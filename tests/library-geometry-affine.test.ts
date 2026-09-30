import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { affineCombine, affineCombineType, affineOriginProof, affineOriginType } from '../src/library/geometry-affine';

test('affine coordinate combination is kernel checked', () => {
  check([], affineCombine, affineCombineType);
  check([], affineOriginProof, affineOriginType);
});
