import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { addVecFstProof, addVecFstType, addVecSndProof, addVecSndType } from '../src/library/geometry-vectors';
import { translateFstProof, translateFstType, translateSndProof, translateSndType } from '../src/library/geometry-transform';

test('vector and translation coordinate laws are kernel checked', () => {
  check([], addVecFstProof, addVecFstType);
  check([], addVecSndProof, addVecSndType);
  check([], translateFstProof, translateFstType);
  check([], translateSndProof, translateSndType);
});
