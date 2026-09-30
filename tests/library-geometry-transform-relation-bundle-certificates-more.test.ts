import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transform-relation-bundle-certificates-more';

test('transform relation point coordinates', () => check([], c.transformedProof, c.transformedType));
test('horizontal transformed vectors parallel', () => check([], c.parallelProof, c.parallelType));
test('axis vectors perpendicular', () => check([], c.perpendicularProof, c.perpendicularType));
test('axis vectors right angle', () => check([], c.rightAngleProof, c.rightAngleType));
