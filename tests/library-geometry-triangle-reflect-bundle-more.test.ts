import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectedTriangleBundleProof, reflectedTriangleBundleType } from '../src/library/geometry-triangle-reflect-bundle-more';
test('three reflected triangle vertices form one certificate bundle', () =>
  check([], reflectedTriangleBundleProof, reflectedTriangleBundleType));
