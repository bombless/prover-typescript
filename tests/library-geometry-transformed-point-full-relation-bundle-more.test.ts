import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { bundleProof, bundleType } from '../src/library/geometry-transformed-point-full-relation-bundle-more';

test('transformed point full relation bundle is kernel checked', () =>
  check([], bundleProof, bundleType));
