import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-rotation-reflection-laws-more';

test('rotation and reflection coordinate laws are kernel checked', () => {
  check([], g.reflectRotateFstProof, g.reflectRotateFstType);
  check([], g.reflectRotateSndProof, g.reflectRotateSndType);
  check([], g.rotateReflectFstProof, g.rotateReflectFstType);
  check([], g.rotateReflectSndProof, g.rotateReflectSndType);
});
