import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-triangle-translated-midpoint-coordinate-laws-more';

test('translated triangle midpoint coordinate law is kernel checked', () => {
  check([], g.translatedFirstEdgeMidpointProof, g.translatedFirstEdgeMidpointType);
});
