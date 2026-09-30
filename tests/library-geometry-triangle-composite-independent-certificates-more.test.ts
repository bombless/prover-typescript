import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotatedFirstVertexType, rotatedFirstVertexProof, reflectedThirdVertexType, reflectedThirdVertexProof, rotatedEdgeDistanceType, rotatedEdgeDistanceProof, translatedThirdNormType, translatedThirdNormProof, rotatedEdgeMidpointType, rotatedEdgeMidpointProof } from '../src/library/geometry-triangle-composite-independent-certificates-more';

test('rotated triangle first vertex', () => check([], rotatedFirstVertexProof, rotatedFirstVertexType));
test('reflected triangle third vertex', () => check([], reflectedThirdVertexProof, reflectedThirdVertexType));
test('rotated triangle edge distance', () => check([], rotatedEdgeDistanceProof, rotatedEdgeDistanceType));
test('translated triangle third norm', () => check([], translatedThirdNormProof, translatedThirdNormType));
test('rotated edge midpoint', () => check([], rotatedEdgeMidpointProof, rotatedEdgeMidpointType));
