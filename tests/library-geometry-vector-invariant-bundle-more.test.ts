import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { vectorInvariantBundleProof, vectorInvariantBundleType } from '../src/library/geometry-vector-invariant-bundle-more';
test('dot cross and norm certificates bundle together', () =>
  check([], vectorInvariantBundleProof, vectorInvariantBundleType));
