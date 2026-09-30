import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { lineTransformRelationBundleProof, lineTransformRelationBundleType } from '../src/library/geometry-line-transform-relation-bundle-more';

test('line transform relation bundle checks', () =>
  check([], lineTransformRelationBundleProof, lineTransformRelationBundleType));
