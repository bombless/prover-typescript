import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointFstProof, midpointFstType, midpointSndProof, midpointSndType } from '../src/library/geometry-segment';

test('midpoint coordinate laws are kernel checked', () => {
  check([], midpointFstProof, midpointFstType);
  check([], midpointSndProof, midpointSndType);
});
