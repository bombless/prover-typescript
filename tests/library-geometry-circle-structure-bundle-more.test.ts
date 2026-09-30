import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { circleStructureBundleProof, circleStructureBundleType } from '../src/library/geometry-circle-structure-bundle-more';

test('circle structure bundle checks', () =>
  check([], circleStructureBundleProof, circleStructureBundleType));
