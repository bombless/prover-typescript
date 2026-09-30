import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { transformCircleBundleProof, transformCircleBundleType } from '../src/library/geometry-transform-circle-bundle-more';

test('transform circle bundle checks', () =>
  check([], transformCircleBundleProof, transformCircleBundleType));
