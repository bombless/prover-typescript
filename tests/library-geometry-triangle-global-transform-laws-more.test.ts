import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-global-transform-laws-more';

test('translated triangle global structure law', () => check([], c.translatedTriangleProof, c.translatedTriangleType));
test('rotated triangle global structure law', () => check([], c.rotatedTriangleProof, c.rotatedTriangleType));
test('reflected triangle global structure law', () => check([], c.reflectedTriangleProof, c.reflectedTriangleType));
