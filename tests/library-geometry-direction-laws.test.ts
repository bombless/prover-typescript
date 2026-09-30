import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { directionFstProof, directionFstType, directionSndProof, directionSndType } from '../src/library/geometry-collinear';

test('direction coordinate laws are kernel checked', () => {
  check([], directionFstProof, directionFstType);
  check([], directionSndProof, directionSndType);
});
