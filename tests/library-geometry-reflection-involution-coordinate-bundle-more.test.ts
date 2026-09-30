import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectionInvolutionCoordinateBundleProof, reflectionInvolutionCoordinateBundleType } from '../src/library/geometry-reflection-involution-coordinate-bundle-more';
test('double reflection coordinate bundle checks', () =>
  check([], reflectionInvolutionCoordinateBundleProof, reflectionInvolutionCoordinateBundleType));
