import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-midpoint-parametric-transform-laws-more';

test('rotated midpoint structural law', () => check([], c.rotatedMidpointShapeProof, c.rotatedMidpointShapeType));
test('translated midpoint structural law', () => check([], c.translatedMidpointShapeProof, c.translatedMidpointShapeType));
