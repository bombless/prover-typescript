import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { movedPointType, movedPointProof, turnedPointType, turnedPointProof, reflectedPointType, reflectedPointProof, reflectedNormType, reflectedNormProof, reflectedCircleType, reflectedCircleProof, transformedDistanceType, transformedDistanceProof } from '../src/library/geometry-circle-transform-metric-certificates-more';

test('moved circle point coordinate', () => check([], movedPointProof, movedPointType));
test('turned circle point coordinate', () => check([], turnedPointProof, turnedPointType));
test('reflected circle point coordinate', () => check([], reflectedPointProof, reflectedPointType));
test('reflected point norm', () => check([], reflectedNormProof, reflectedNormType));
test('reflected point circle membership', () => check([], reflectedCircleProof, reflectedCircleType));
test('transformed point distance', () => check([], transformedDistanceProof, transformedDistanceType));
