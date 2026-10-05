import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectX, reflectXType, reflectOriginProof, reflectOriginType, reflectTwiceProof, reflectTwiceType, reflectXIdentityProof, reflectXIdentityType, reflectFstProof, reflectFstType, reflectSndProof, reflectSndType, reflectCoordinateProof, reflectCoordinateType, reflectLargerProof, reflectLargerType, reflectTwiceLargerProof, reflectTwiceLargerType } from '../src/library/geometry-reflections';

test('coordinate reflection examples are kernel checked', () => {
  check([], reflectX, reflectXType);
  check([], reflectOriginProof, reflectOriginType);
  check([], reflectTwiceProof, reflectTwiceType);
  check([], reflectXIdentityProof, reflectXIdentityType);
  check([], reflectFstProof, reflectFstType);
  check([], reflectSndProof, reflectSndType);
  check([], reflectCoordinateProof, reflectCoordinateType);
  check([], reflectLargerProof, reflectLargerType);
  check([], reflectTwiceLargerProof, reflectTwiceLargerType);
});
