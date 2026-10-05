import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-quadrilateral-configuration-bundle-more-2';
test('quadrilateral configuration certificates are kernel checked', () => {
  check([], g.aProof, g.aType); check([], g.bProof, g.bType);
  check([], g.cProof, g.cType); check([], g.eProof, g.eType);
  check([], g.midpointProof, g.midpointType); check([], g.aNormProof, g.aNormType);
  check([], g.eCircleProof, g.eCircleType); check([], g.bVerticalProof, g.bVerticalType);
  check([], g.acMidpointNormProof, g.acMidpointNormType);
  check([], g.aCircleProof, g.aCircleType);
});
