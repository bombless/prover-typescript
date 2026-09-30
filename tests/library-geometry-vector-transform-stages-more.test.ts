import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { stagedTransformProof, stagedTransformType } from '../src/library/geometry-vector-transform-stages-more';
test('vector sum, scale, and rotation stages form one certificate', () =>
  check([], stagedTransformProof, stagedTransformType));
