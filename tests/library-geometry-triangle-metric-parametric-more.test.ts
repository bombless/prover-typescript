import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleFirstSecondDistanceProof, triangleFirstSecondDistanceType, rotatedTriangleSideProof, rotatedTriangleSideType } from '../src/library/geometry-triangle-metric-parametric-more';

test('triangle first-second distance expression is kernel checked', () => check([], triangleFirstSecondDistanceProof, triangleFirstSecondDistanceType));
test('rotated triangle side metric expression is kernel checked', () => check([], rotatedTriangleSideProof, rotatedTriangleSideType));
