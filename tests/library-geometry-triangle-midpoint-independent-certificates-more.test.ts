import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointType, midpointProof, rotatedMidpointType, rotatedMidpointProof, reflectedMidpointType, reflectedMidpointProof, midpointNormType, midpointNormProof, midpointToAType, midpointToAProof } from '../src/library/geometry-triangle-midpoint-independent-certificates-more';

test('triangle midpoint coordinates', () => check([], midpointProof, midpointType));
test('rotated triangle midpoint', () => check([], rotatedMidpointProof, rotatedMidpointType));
test('reflected triangle midpoint', () => check([], reflectedMidpointProof, reflectedMidpointType));
test('triangle midpoint norm', () => check([], midpointNormProof, midpointNormType));
test('midpoint to first endpoint metric', () => check([], midpointToAProof, midpointToAType));
