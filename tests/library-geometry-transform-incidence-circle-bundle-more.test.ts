import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { transformIncidenceCircleBundleProof, transformIncidenceCircleBundleType } from '../src/library/geometry-transform-incidence-circle-bundle-more';

test('transform incidence circle bundle checks', () =>
  check([], transformIncidenceCircleBundleProof, transformIncidenceCircleBundleType));
