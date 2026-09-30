import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transformed-relation-concrete-bundle-more';

test('rotated axis parallel certificate is kernel checked', () =>
  check([], c.rotatedParallelProof, c.rotatedParallelType));
test('scaled perpendicular certificate is kernel checked', () =>
  check([], c.scaledPerpendicularProof, c.scaledPerpendicularType));
test('scaled parallel certificate is kernel checked', () =>
  check([], c.scaledParallelProof, c.scaledParallelType));
test('rotated scaled perpendicular certificate is kernel checked', () =>
  check([], c.rotatedScaledPerpendicularProof, c.rotatedScaledPerpendicularType));
