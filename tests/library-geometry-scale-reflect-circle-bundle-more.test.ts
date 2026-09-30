import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleReflectCircleBundleProof, scaleReflectCircleBundleType } from '../src/library/geometry-scale-reflect-circle-bundle-more';

test('scale reflect circle bundle checks', () =>
  check([], scaleReflectCircleBundleProof, scaleReflectCircleBundleType));
