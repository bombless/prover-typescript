import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { movedCoordinateType, movedCoordinateProof, turnedCoordinateType, turnedCoordinateProof, turnedVerticalType, turnedVerticalProof, turnedIncidenceType, turnedIncidenceProof, turnedCircleType, turnedCircleProof, turnedNormType, turnedNormProof } from '../src/library/geometry-line-circle-triangle-metric-certificates-more';

test('moved point coordinate certificate', () => check([], movedCoordinateProof, movedCoordinateType));
test('turned point coordinate certificate', () => check([], turnedCoordinateProof, turnedCoordinateType));
test('turned vertical line certificate', () => check([], turnedVerticalProof, turnedVerticalType));
test('turned line incidence certificate', () => check([], turnedIncidenceProof, turnedIncidenceType));
test('turned circle membership certificate', () => check([], turnedCircleProof, turnedCircleType));
test('turned norm certificate', () => check([], turnedNormProof, turnedNormType));
