import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { sideDistanceProof, sideDistanceType, sideDisplacementProof, sideDisplacementType, pointNormProof, pointNormType, circleMembershipMeasurementProof, circleMembershipMeasurementType, centerMembershipProof, centerMembershipType } from '../src/library/geometry-measurement-compositions';

test('concrete side distance is kernel checked', () => check([], sideDistanceProof, sideDistanceType));
test('concrete side displacement is kernel checked', () => check([], sideDisplacementProof, sideDisplacementType));
test('concrete point norm is kernel checked', () => check([], pointNormProof, pointNormType));
test('measured circle membership is kernel checked', () => check([], circleMembershipMeasurementProof, circleMembershipMeasurementType));
test('center membership on a zero circle is kernel checked', () => check([], centerMembershipProof, centerMembershipType));
