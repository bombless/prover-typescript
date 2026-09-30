import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { concreteRightAngleType, concreteRightAngleProof, swappedRightAngleType, swappedRightAngleProof, originRightAngleType, originRightAngleProof } from '../src/library/geometry-right-angle-independent-certificates-more';

test('concrete right angle checks', () => check([], concreteRightAngleProof, concreteRightAngleType));
test('swapped right angle checks', () => check([], swappedRightAngleProof, swappedRightAngleType));
test('origin right angle checks', () => check([], originRightAngleProof, originRightAngleType));
