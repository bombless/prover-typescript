import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleStructureBundleProof, triangleStructureBundleType } from '../src/library/geometry-triangle-structure-bundle-more';

test('triangle structure bundle checks', () =>
  check([], triangleStructureBundleProof, triangleStructureBundleType));
