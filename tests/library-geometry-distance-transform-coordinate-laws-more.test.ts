import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-distance-transform-coordinate-laws-more';

test('translated distance coordinate formula', () => check([], c.translatedDistanceProof, c.translatedDistanceType));
test('rotated distance coordinate formula', () => check([], c.rotatedDistanceProof, c.rotatedDistanceType));
