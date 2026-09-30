import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-midpoint-transform-coordinate-laws-more';

test('translated midpoint coordinate law', () => check([], c.translatedMidpointProof, c.translatedMidpointType));
test('rotated midpoint coordinate law', () => check([], c.rotatedMidpointProof, c.rotatedMidpointType));
