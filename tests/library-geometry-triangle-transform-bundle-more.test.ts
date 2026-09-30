import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translatedTriangleBundleProof, translatedTriangleBundleType } from '../src/library/geometry-triangle-transform-bundle-more';

test('three translated triangle vertices form one certificate bundle', () =>
  check([], translatedTriangleBundleProof, translatedTriangleBundleType));
