import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Point2, origin2, origin2Type, origin2Proof, originXProof, originXType, originYProof, originYType } from '../src/library/geometry-points';
import { Type } from '../src/syntax/ast';

test('two-dimensional points and coordinate projections are kernel checked', () => {
  check([], Point2, Type);
  check([], origin2Proof, origin2Type);
  check([], originXProof, originXType);
  check([], originYProof, originYType);
});
