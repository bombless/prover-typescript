import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectionCoordinateBundleProof, reflectionCoordinateBundleType } from '../src/library/geometry-reflection-coordinate-bundle-more';
test('reflection coordinate bundle checks for arbitrary points', () =>
  check([], reflectionCoordinateBundleProof, reflectionCoordinateBundleType));
