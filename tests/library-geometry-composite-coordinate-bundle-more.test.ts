import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { compositeCoordinateBundleProof, compositeCoordinateBundleType } from '../src/library/geometry-composite-coordinate-bundle-more';
test('translate rotate reflect coordinate bundle checks', () =>
  check([], compositeCoordinateBundleProof, compositeCoordinateBundleType));
