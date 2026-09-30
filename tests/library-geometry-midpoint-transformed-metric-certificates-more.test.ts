import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointMovedType, midpointMovedProof, midpointTurnedType, midpointTurnedProof, midpointTurnedNormType, midpointTurnedNormProof } from '../src/library/geometry-midpoint-transformed-metric-certificates-more';

test('moved midpoint coordinates', () => check([], midpointMovedProof, midpointMovedType));
test('turned midpoint coordinates', () => check([], midpointTurnedProof, midpointTurnedType));
test('turned midpoint norm', () => check([], midpointTurnedNormProof, midpointTurnedNormType));
