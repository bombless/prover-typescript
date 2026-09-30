import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { lineCircleTransformBundleProof, lineCircleTransformBundleType } from '../src/library/geometry-line-circle-transform-bundle-more';

test('line circle transform bundle checks', () =>
  check([], lineCircleTransformBundleProof, lineCircleTransformBundleType));
