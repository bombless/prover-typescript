import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-reflect-rotate-translate-vector-bundle-more';

test('reflect rotate translate vector coordinates and norms are kernel checked', () => {
  check([], c.vProof, c.vType); check([], c.wProof, c.wType);
  check([], c.vNormProof, c.vNormType); check([], c.wNormProof, c.wNormType);
});
test('reflect rotate translate vector dot and cross are kernel checked', () => {
  check([], c.dotProof, c.dotType); check([], c.crossProof, c.crossType);
});
