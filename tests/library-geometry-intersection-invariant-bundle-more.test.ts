import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { intersectionInvariantProof, intersectionInvariantType } from '../src/library/geometry-intersection-invariant-bundle-more';
test('intersection incidence membership and norm certificates bundle', () =>
  check([], intersectionInvariantProof, intersectionInvariantType));
