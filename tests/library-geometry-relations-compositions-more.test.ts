import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotatedParallelProof, rotatedParallelType, scaledPerpendicularProof, scaledPerpendicularType, rightAngleAfterRotationProof, rightAngleAfterRotationType, collinearConcreteTripleProof, collinearConcreteTripleType, slopeParallelProof, slopeParallelType } from '../src/library/geometry-relations-compositions-more';

test('rotated vectors feed the parallel expression', () => check([], rotatedParallelProof, rotatedParallelType));
test('scaled vectors feed the perpendicular relation', () => check([], scaledPerpendicularProof, scaledPerpendicularType));
test('rotated axes feed the right-angle expression', () => check([], rightAngleAfterRotationProof, rightAngleAfterRotationType));
test('concrete triples feed the collinearity relation', () => check([], collinearConcreteTripleProof, collinearConcreteTripleType));
test('slope vectors feed the parallel expression', () => check([], slopeParallelProof, slopeParallelType));
