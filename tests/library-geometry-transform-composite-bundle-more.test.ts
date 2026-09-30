import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { transformCompositeBundleProof, transformCompositeBundleType } from '../src/library/geometry-transform-composite-bundle-more';

test('transform composite bundle checks', () =>
  check([], transformCompositeBundleProof, transformCompositeBundleType));
