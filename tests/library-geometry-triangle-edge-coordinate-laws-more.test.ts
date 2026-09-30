import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-triangle-edge-coordinate-laws-more';

test('translated triangle edge start law', () => check([], c.translatedEdgeStartProof, c.translatedEdgeStartType));
test('rotated triangle edge end law', () => check([], c.rotatedEdgeEndProof, c.rotatedEdgeEndType));
