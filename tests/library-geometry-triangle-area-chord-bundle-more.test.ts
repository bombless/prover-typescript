import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleAreaChordBundleProof, triangleAreaChordBundleType } from '../src/library/geometry-triangle-area-chord-bundle-more';

test('triangle area chord bundle checks', () =>
  check([], triangleAreaChordBundleProof, triangleAreaChordBundleType));
