import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { concreteCircleProof, concreteCircleType } from '../src/library/geometry-circle-laws';
test('concrete circle structure is kernel checked', () => check([], concreteCircleProof, concreteCircleType));
