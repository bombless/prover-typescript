import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-circle-line-structure-bundle-more-2';
test('line and circle structure bundles are kernel checked', () => {
  check([], g.lineTransformBundleProof, g.lineTransformBundleType);
  check([], g.circleRotateBundleProof, g.circleRotateBundleType);
});
