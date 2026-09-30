import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { circleMembershipBundleProof, circleMembershipBundleType } from '../src/library/geometry-circle-membership-bundle-more';

test('circle membership bundle checks', () =>
  check([], circleMembershipBundleProof, circleMembershipBundleType));
