import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import {
  rotateZeroProof, rotateZeroType, scaleZeroProof, scaleZeroType,
  rotatedZeroParallelProof, rotatedZeroParallelType,
  scaledZeroPerpendicularProof, scaledZeroPerpendicularType
} from '../src/library/geometry-transform-relations-more';

test('rotation preserves the zero vector', () => check([], rotateZeroProof, rotateZeroType));
test('scaling preserves the zero vector', () => check([], scaleZeroProof, scaleZeroType));
test('rotated zero vector is parallel to every vector', () => check([], rotatedZeroParallelProof, rotatedZeroParallelType));
test('scaled zero vector is perpendicular to every vector', () => check([], scaledZeroPerpendicularProof, scaledZeroPerpendicularType));
