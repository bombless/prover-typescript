import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translatedCenterProof, translatedCenterType, rotatedCenterProof, rotatedCenterType, transformedCircleMemberProof, transformedCircleMemberType, constructedCircleProjectionProof, constructedCircleProjectionType } from '../src/library/geometry-circle-transform-more';

test('translated circle center computes', () => check([], translatedCenterProof, translatedCenterType));
test('rotated circle center computes', () => check([], rotatedCenterProof, rotatedCenterType));
test('transformed circle membership computes', () => check([], transformedCircleMemberProof, transformedCircleMemberType));
test('constructed circle projections compute', () => check([], constructedCircleProjectionProof, constructedCircleProjectionType));
