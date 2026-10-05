import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotate90, rotate90Type, rotateOriginProof, rotateOriginType, rotateAxisProof, rotateAxisType, rotate90TwiceProof, rotate90TwiceType, rotateFstProof, rotateFstType, rotateSndProof, rotateSndType, rotateFourProof, rotateFourType, rotateConcreteProof, rotateConcreteType, rotateLargerProof, rotateLargerType, rotateTwiceLargerProof, rotateTwiceLargerType } from '../src/library/geometry-rotations';

test('coordinate rotation structure is kernel checked', () => {
  check([], rotate90, rotate90Type);
  check([], rotateOriginProof, rotateOriginType);
  check([], rotateAxisProof, rotateAxisType);
  check([], rotate90TwiceProof, rotate90TwiceType);
  check([], rotateFstProof, rotateFstType);
  check([], rotateSndProof, rotateSndType);
  check([], rotateFourProof, rotateFourType);
  check([], rotateConcreteProof, rotateConcreteType);
  check([], rotateLargerProof, rotateLargerType);
  check([], rotateTwiceLargerProof, rotateTwiceLargerType);
});
