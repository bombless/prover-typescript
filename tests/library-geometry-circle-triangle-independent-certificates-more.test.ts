import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { movedCenterType, movedCenterProof, rotatedCenterType, rotatedCenterProof, reflectedCenterType, reflectedCenterProof, movedCenterNormType, movedCenterNormProof, rotatedCenterCircleType, rotatedCenterCircleProof, reflectedCenterDistanceType, reflectedCenterDistanceProof } from '../src/library/geometry-circle-triangle-independent-certificates-more';

test('moved circle center', () => check([], movedCenterProof, movedCenterType));
test('rotated circle center', () => check([], rotatedCenterProof, rotatedCenterType));
test('reflected circle center', () => check([], reflectedCenterProof, reflectedCenterType));
test('moved center norm', () => check([], movedCenterNormProof, movedCenterNormType));
test('rotated center circle membership', () => check([], rotatedCenterCircleProof, rotatedCenterCircleType));
test('reflected center distance', () => check([], reflectedCenterDistanceProof, reflectedCenterDistanceType));
