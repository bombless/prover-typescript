import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import {
  originCircleBundleProof,
  originCircleBundleType
} from '../src/library/geometry-circle-origin-membership-bundle-more';

test('origin memberships bundle checks', () =>
  check([], originCircleBundleProof, originCircleBundleType));
