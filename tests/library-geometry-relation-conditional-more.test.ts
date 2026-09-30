import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import {
  parallelFromCrossZeroProof, parallelFromCrossZeroType,
  perpendicularFromDotZeroProof, perpendicularFromDotZeroType,
  crossZeroFromParallelProof, crossZeroFromParallelType,
  dotZeroFromPerpendicularProof, dotZeroFromPerpendicularType,
  zeroPerpendicularProof, zeroPerpendicularType
} from '../src/library/geometry-relation-conditional-more';

test('cross zero implies the model parallel relation', () =>
  check([], parallelFromCrossZeroProof, parallelFromCrossZeroType));

test('dot zero implies the model perpendicular relation', () =>
  check([], perpendicularFromDotZeroProof, perpendicularFromDotZeroType));
test('parallel relation exposes its cross zero condition', () =>
  check([], crossZeroFromParallelProof, crossZeroFromParallelType));
test('perpendicular relation exposes its dot zero condition', () =>
  check([], dotZeroFromPerpendicularProof, dotZeroFromPerpendicularType));
test('zero vector is perpendicular to every vector', () =>
  check([], zeroPerpendicularProof, zeroPerpendicularType));
