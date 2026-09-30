import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateZeroParallelProof, rotateZeroParallelType, rotateZeroPerpendicularProof, rotateZeroPerpendicularType, reflectZeroParallelProof, reflectZeroParallelType, reflectZeroPerpendicularProof, reflectZeroPerpendicularType } from '../src/library/geometry-relations-transform-parametric-more';

test('rotated zero vector is parallel-compatible', () => check([], rotateZeroParallelProof, rotateZeroParallelType));
test('rotated zero vector is perpendicular-compatible', () => check([], rotateZeroPerpendicularProof, rotateZeroPerpendicularType));
test('reflected zero vector is parallel-compatible', () => check([], reflectZeroParallelProof, reflectZeroParallelType));
test('reflected zero vector is perpendicular-compatible', () => check([], reflectZeroPerpendicularProof, reflectZeroPerpendicularType));
