import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-coordinate-transform-laws-more';

test('translated triangle all-coordinate law', () => check([], c.translatedTriangleCoordinatesProof, c.translatedTriangleCoordinatesType));
test('rotated triangle all-coordinate law', () => check([], c.rotatedTriangleCoordinatesProof, c.rotatedTriangleCoordinatesType));
