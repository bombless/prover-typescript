import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as g from '../src/library/geometry-triangle-configuration-bundle-more-2';
test('triangle configuration certificates are kernel checked', () => {
  check([], g.aProof, g.aType); check([], g.bProof, g.bType); check([], g.cProof, g.cType);
  check([], g.midpointProof, g.midpointType); check([], g.aNormProof, g.aNormType);
  check([], g.abDotProof, g.abDotType); check([], g.acCrossProof, g.acCrossType);
});
