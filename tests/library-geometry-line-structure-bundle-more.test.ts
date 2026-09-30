import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { lineStructureBundleProof, lineStructureBundleType } from '../src/library/geometry-line-structure-bundle-more';

test('line structure bundle checks', () =>
  check([], lineStructureBundleProof, lineStructureBundleType));
