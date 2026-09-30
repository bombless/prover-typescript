import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleScaleRotateTranslateBundleProof, triangleScaleRotateTranslateBundleType } from '../src/library/geometry-triangle-scale-rotate-translate-bundle-more';

test('triangle scale rotate translate bundle checks', () =>
  check([], triangleScaleRotateTranslateBundleProof, triangleScaleRotateTranslateBundleType));
