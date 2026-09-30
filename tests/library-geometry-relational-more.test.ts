import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { slopeConcreteProof, slopeConcreteType, slopeTruncatedProof, slopeTruncatedType, slopeCrossProof, slopeCrossType, slopeDotProof, slopeDotType, slopeNormProof, slopeNormType, verticalMembershipProof, verticalMembershipType, slopeFstProof, slopeFstType, slopeSndProof, slopeSndType } from '../src/library/geometry-relational-more';

test('concrete slope vector is kernel checked', () => check([], slopeConcreteProof, slopeConcreteType));
test('truncated slope vector is kernel checked', () => check([], slopeTruncatedProof, slopeTruncatedType));
test('cross of computed slope is kernel checked', () => check([], slopeCrossProof, slopeCrossType));
test('dot of computed slope is kernel checked', () => check([], slopeDotProof, slopeDotType));
test('norm of computed slope is kernel checked', () => check([], slopeNormProof, slopeNormType));
test('vertical line membership is kernel checked', () => check([], verticalMembershipProof, verticalMembershipType));
test('slope first projection is kernel checked', () => check([], slopeFstProof, slopeFstType));
test('slope second projection is kernel checked', () => check([], slopeSndProof, slopeSndType));
