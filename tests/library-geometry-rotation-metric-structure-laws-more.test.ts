import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-rotation-metric-structure-laws-more';

test('rotation self dot structure', () => check([], c.rotateSelfDotProof, c.rotateSelfDotType));
test('rotation norm coordinate structure', () => check([], c.rotateNormCoordinateProof, c.rotateNormCoordinateType));
test('concrete rotation metric bundle', () => check([], c.rotateMetricConcreteProof, c.rotateMetricConcreteType));
