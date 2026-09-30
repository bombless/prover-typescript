import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleFirstSecondDotProof, triangleFirstSecondDotType, triangleSecondThirdCrossProof, triangleSecondThirdCrossType, rotatedFirstVertexDotProof, rotatedFirstVertexDotType } from '../src/library/geometry-triangle-relations-parametric-more';

test('triangle first and second vertices feed dot product', () => check([], triangleFirstSecondDotProof, triangleFirstSecondDotType));
test('triangle second and third vertices feed cross expression', () => check([], triangleSecondThirdCrossProof, triangleSecondThirdCrossType));
test('rotated triangle vertex feeds dot product', () => check([], rotatedFirstVertexDotProof, rotatedFirstVertexDotType));
