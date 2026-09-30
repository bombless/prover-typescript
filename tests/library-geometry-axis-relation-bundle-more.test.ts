import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { axisRelationBundleProof, axisRelationBundleType } from '../src/library/geometry-axis-relation-bundle-more';

test('axis relation bundle checks', () =>
  check([], axisRelationBundleProof, axisRelationBundleType));
