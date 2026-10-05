import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpoint, midpointType, sameMidpointProof, sameMidpointType, midpointSelfProof, midpointSelfType, midpointProjectionEtaProof, midpointProjectionEtaType } from '../src/library/geometry-segment';

test('segment midpoint structure is kernel checked', () => {
  check([], midpoint, midpointType);
  check([], sameMidpointProof, sameMidpointType);
  check([], midpointSelfProof, midpointSelfType);
  check([], midpointProjectionEtaProof, midpointProjectionEtaType);
});
