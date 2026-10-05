import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-quadrilateral-translated-midpoint-coordinate-laws-more';

test('translated quadrilateral midpoint law is kernel checked', () => {
  check([], g.firstEdgeTranslatedMidpointProof, g.firstEdgeTranslatedMidpointType);
});
