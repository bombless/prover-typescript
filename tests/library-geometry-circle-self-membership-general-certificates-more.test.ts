import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { pointSelfCircleType, pointSelfCircleProof } from '../src/library/geometry-circle-self-membership-general-certificates-more';

test('point self circle metric certificate', () => check([], pointSelfCircleProof, pointSelfCircleType));
