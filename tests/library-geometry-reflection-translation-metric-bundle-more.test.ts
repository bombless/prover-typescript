import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-reflection-translation-metric-bundle-more';

test('reflected translated points and norms are kernel checked', () => {
  check([], c.pProof, c.pType); check([], c.qProof, c.qType);
  check([], c.pNormProof, c.pNormType); check([], c.qNormProof, c.qNormType);
});

test('reflected translated point metrics are kernel checked', () => {
  check([], c.pqDistanceProof, c.pqDistanceType);
  check([], c.pqDotProof, c.pqDotType);
  check([], c.pqCrossProof, c.pqCrossType);
});
