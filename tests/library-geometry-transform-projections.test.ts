import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectFstProof, reflectFstType, reflectSndProof, reflectSndType } from '../src/library/geometry-reflections';
import { rotateFstProof, rotateFstType, rotateSndProof, rotateSndType, rotateTwiceFstProof, rotateTwiceFstType, rotateTwiceSndProof, rotateTwiceSndType } from '../src/library/geometry-rotations';

test('reflection and rotation projection laws are kernel checked', () => {
  check([], reflectFstProof, reflectFstType);
  check([], reflectSndProof, reflectSndType);
  check([], rotateFstProof, rotateFstType);
  check([], rotateSndProof, rotateSndType);
  check([], rotateTwiceFstProof, rotateTwiceFstType);
  check([], rotateTwiceSndProof, rotateTwiceSndType);
});
