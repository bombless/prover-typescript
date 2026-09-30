import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointDiscrete, midpointDiscreteType, midpointOriginProof, midpointOriginType } from '../src/library/geometry-barycentric';

test('barycentric midpoint structure is kernel checked', () => {
  check([], midpointDiscrete, midpointDiscreteType);
  check([], midpointOriginProof, midpointOriginType);
});
