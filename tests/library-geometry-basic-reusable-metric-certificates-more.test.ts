import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { reflectedNormType, reflectedNormProof, rotatedNormType, rotatedNormProof, movedPointNormType, movedPointNormProof, movedPointCircleType, movedPointCircleProof, rotatedEdgeDistanceType, rotatedEdgeDistanceProof, midpointNormType, midpointNormProof } from '../src/library/geometry-basic-reusable-metric-certificates-more';

test('reflected point norm certificate', () => check([], reflectedNormProof, reflectedNormType));
test('rotated point norm certificate', () => check([], rotatedNormProof, rotatedNormType));
test('moved point norm certificate', () => check([], movedPointNormProof, movedPointNormType));
test('moved point circle certificate', () => check([], movedPointCircleProof, movedPointCircleType));
test('rotated edge distance certificate', () => check([], rotatedEdgeDistanceProof, rotatedEdgeDistanceType));
test('midpoint norm certificate', () => check([], midpointNormProof, midpointNormType));
