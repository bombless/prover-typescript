import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-transformed-relation-bundle-more-2';

test('transformed relation bundles are kernel checked', () => {
  for (const k of ['translatedVertical', 'translatedIncidence', 'circleMembershipUnfold']) {
    check([], (g as any)[k + 'Proof'], (g as any)[k + 'Type']);
  }
});
