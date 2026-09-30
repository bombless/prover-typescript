import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { parallelZeroProof, parallelZeroType, perpendicularAxisProof, perpendicularAxisType, collinearConcreteMoreProof, collinearConcreteMoreType, incidenceConcreteMoreProof, incidenceConcreteMoreType, verticalConcreteMoreProof, verticalConcreteMoreType, rightAngleConcreteMoreProof, rightAngleConcreteMoreType } from '../src/library/geometry-relations-concrete-more';

test('concrete parallel relation is kernel checked', () => check([], parallelZeroProof, parallelZeroType));
test('concrete perpendicular relation is kernel checked', () => check([], perpendicularAxisProof, perpendicularAxisType));
test('concrete collinearity relation is kernel checked', () => check([], collinearConcreteMoreProof, collinearConcreteMoreType));
test('concrete incidence relation is kernel checked', () => check([], incidenceConcreteMoreProof, incidenceConcreteMoreType));
test('concrete vertical line relation is kernel checked', () => check([], verticalConcreteMoreProof, verticalConcreteMoreType));
test('concrete right angle relation is kernel checked', () => check([], rightAngleConcreteMoreProof, rightAngleConcreteMoreType));
