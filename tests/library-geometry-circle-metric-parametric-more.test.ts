import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { circleCenterDistanceProof, circleCenterDistanceType, rotatedCircleCenterDistanceProof, rotatedCircleCenterDistanceType } from '../src/library/geometry-circle-metric-parametric-more';

test('circle center distance expression is kernel checked', () => check([], circleCenterDistanceProof, circleCenterDistanceType));
test('rotated circle center distance expression is kernel checked', () => check([], rotatedCircleCenterDistanceProof, rotatedCircleCenterDistanceType));
