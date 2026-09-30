import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointAreaBundleProof, midpointAreaBundleType } from '../src/library/geometry-midpoint-area-bundle-more';
test('midpoint and area certificates bundle together', () =>
  check([], midpointAreaBundleProof, midpointAreaBundleType));
