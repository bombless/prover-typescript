import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { transformedCircleBundleProof, transformedCircleBundleType } from '../src/library/geometry-circle-transform-bundle-more';
test('translated rotated circle center and radius bundle checks', () =>
  check([], transformedCircleBundleProof, transformedCircleBundleType));
