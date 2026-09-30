import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotatedIntersectionProof, rotatedIntersectionType } from '../src/library/geometry-intersection-transform-certificate-more';
test('rotated point coordinate and intersection certificates bundle', () =>
  check([], rotatedIntersectionProof, rotatedIntersectionType));
