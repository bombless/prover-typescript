import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleRotateCircleBundleProof, scaleRotateCircleBundleType } from '../src/library/geometry-scale-rotate-circle-bundle-more';

test('scale rotate circle bundle checks', () =>
  check([], scaleRotateCircleBundleProof, scaleRotateCircleBundleType));
