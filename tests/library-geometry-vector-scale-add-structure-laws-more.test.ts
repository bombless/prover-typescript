import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-vector-scale-add-structure-laws-more';

test('scale after add first coordinate structure', () => check([], c.scaleAddFirstCoordinateProof, c.scaleAddFirstCoordinateType));
test('scale after add second coordinate structure', () => check([], c.scaleAddSecondCoordinateProof, c.scaleAddSecondCoordinateType));
