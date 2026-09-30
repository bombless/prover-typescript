import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { axisPerpendicularType, axisPerpendicularProof, axisRightAngleType, axisRightAngleProof, zeroPerpendicularType, zeroPerpendicularProof } from '../src/library/geometry-perpendicular-independent-certificates-more';

test('axis perpendicular checks', () => check([], axisPerpendicularProof, axisPerpendicularType));
test('axis right angle checks', () => check([], axisRightAngleProof, axisRightAngleType));
test('zero perpendicular checks', () => check([], zeroPerpendicularProof, zeroPerpendicularType));
