import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { transformedTriangleProof, transformedTriangleType, transformedSideProof, transformedSideType, reflectedTranslatedVertexProof, reflectedTranslatedVertexType } from '../src/library/geometry-triangle-transform-more';

test('rotated triangle computes vertexwise', () => check([], transformedTriangleProof, transformedTriangleType));
test('rotated triangle side computes', () => check([], transformedSideProof, transformedSideType));
test('reflected translated triangle vertex computes', () => check([], reflectedTranslatedVertexProof, reflectedTranslatedVertexType));
