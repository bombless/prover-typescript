import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { movedPointType, movedPointProof, turnedPointType, turnedPointProof, reflectedPointType, reflectedPointProof, turnedNormType, turnedNormProof, verticalMembershipType, verticalMembershipProof, transformedCircleType, transformedCircleProof } from '../src/library/geometry-transform-line-circle-independent-certificates-more';

test('moved point coordinates', () => check([], movedPointProof, movedPointType));
test('turned point coordinates', () => check([], turnedPointProof, turnedPointType));
test('reflected point coordinates', () => check([], reflectedPointProof, reflectedPointType));
test('turned point norm', () => check([], turnedNormProof, turnedNormType));
test('turned point vertical membership', () => check([], verticalMembershipProof, verticalMembershipType));
test('turned point circle membership', () => check([], transformedCircleProof, transformedCircleType));
