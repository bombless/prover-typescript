import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-vector-algebra-laws-more-2';
test('scaled vector addition coordinate laws are kernel checked', () => {
  check([], g.scaledAddFstProof, g.scaledAddFstType);
  check([], g.scaledAddSndProof, g.scaledAddSndType);
});
