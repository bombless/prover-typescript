import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { incidenceConcreteProof, incidenceConcreteType, verticalConcreteProof, verticalConcreteType, circleProjectionProof, circleProjectionType, lineProjectionProof, lineProjectionType } from '../src/library/geometry-line-circle-more';

test('concrete incidence computes', () => check([], incidenceConcreteProof, incidenceConcreteType));
test('vertical line predicate computes', () => check([], verticalConcreteProof, verticalConcreteType));
test('circle projections reconstruct the circle', () => check([], circleProjectionProof, circleProjectionType));
test('line projections reconstruct the line', () => check([], lineProjectionProof, lineProjectionType));
