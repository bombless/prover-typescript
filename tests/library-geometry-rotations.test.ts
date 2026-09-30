import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotate90, rotate90Type, rotateOriginProof, rotateOriginType, rotateAxisProof, rotateAxisType } from '../src/library/geometry-rotations';

test('coordinate rotation structure is kernel checked', () => {
  check([], rotate90, rotate90Type);
  check([], rotateOriginProof, rotateOriginType);
  check([], rotateAxisProof, rotateAxisType);
});
