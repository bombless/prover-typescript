import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-axis-relation-certificates-more';

test('horizontal vectors are parallel', () => check([], c.horizontalParallelProof, c.horizontalParallelType));
test('vertical vectors are parallel', () => check([], c.verticalParallelProof, c.verticalParallelType));
test('axis vectors are perpendicular', () => check([], c.axesPerpendicularProof, c.axesPerpendicularType));
test('swapped axis vectors are perpendicular', () => check([], c.swappedAxesPerpendicularProof, c.swappedAxesPerpendicularType));
test('axis vectors form a right angle', () => check([], c.axesRightAngleProof, c.axesRightAngleType));
test('zero vector is parallel-compatible', () => check([], c.zeroParallelProof, c.zeroParallelType));
