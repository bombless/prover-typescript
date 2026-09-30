import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { Type } from '../src/syntax/ast';
import { Vec2, addVec2, addVec2Type, zeroVec, zeroVecType, zeroVecProof, zeroVecXProof, zeroVecXType, zeroVecYProof, zeroVecYType } from '../src/library/geometry-vectors';

test('vectors and coordinatewise addition are kernel checked', () => {
  check([], Vec2, Type);
  check([], addVec2, addVec2Type);
  check([], zeroVecProof, zeroVecType);
  check([], zeroVecXProof, zeroVecXType);
  check([], zeroVecYProof, zeroVecYType);
});
