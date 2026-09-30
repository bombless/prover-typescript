import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointVectorBundleProof, midpointVectorBundleType } from '../src/library/geometry-midpoint-vector-bundle-more';
test('midpoint dot and norm certificates bundle together', () =>
  check([], midpointVectorBundleProof, midpointVectorBundleType));
