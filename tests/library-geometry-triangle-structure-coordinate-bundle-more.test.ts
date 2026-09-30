import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleStructureCoordinateBundleProof, triangleStructureCoordinateBundleType } from '../src/library/geometry-triangle-structure-coordinate-bundle-more';

test('triangle structure coordinate bundle checks', () =>
  check([], triangleStructureCoordinateBundleProof, triangleStructureCoordinateBundleType));
