import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectX, reflectXType, reflectOriginProof, reflectOriginType, reflectTwiceProof, reflectTwiceType } from '../src/library/geometry-reflections';

test('coordinate reflection examples are kernel checked', () => {
  check([], reflectX, reflectXType);
  check([], reflectOriginProof, reflectOriginType);
  check([], reflectTwiceProof, reflectTwiceType);
});
