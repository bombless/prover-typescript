import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleScaleRotateBundleProof, triangleScaleRotateBundleType } from '../src/library/geometry-triangle-scale-rotate-bundle-more';

test('triangle scale rotate bundle checks', () =>
  check([], triangleScaleRotateBundleProof, triangleScaleRotateBundleType));
