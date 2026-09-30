import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-six-point-chain-bundle-more';

test('six transformed points are kernel checked', () => {
  check([], c.pProof, c.pType); check([], c.qProof, c.qType); check([], c.rProof, c.rType);
  check([], c.sProof, c.sType); check([], c.tProof, c.tType); check([], c.uProof, c.uType);
});
test('six point metrics and circle membership are kernel checked', () => {
  check([], c.pNormProof, c.pNormType); check([], c.qNormProof, c.qNormType);
  check([], c.pqDotProof, c.pqDotType); check([], c.rCircleProof, c.rCircleType);
});
