import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectionRotationCoordinateProof, reflectionRotationCoordinateType } from '../src/library/geometry-reflection-rotation-coordinate-bundle-more';
test('reflection after rotation coordinate formula checks', () =>
  check([], reflectionRotationCoordinateProof, reflectionRotationCoordinateType));
