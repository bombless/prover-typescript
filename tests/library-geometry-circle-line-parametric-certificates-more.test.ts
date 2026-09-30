import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-circle-line-parametric-certificates-more';

test('circle center projection law', () => check([], c.circleCenterProjectionProof, c.circleCenterProjectionType));
test('circle radius projection law', () => check([], c.circleRadiusProjectionProof, c.circleRadiusProjectionType));
test('line incidence base projection law', () => check([], c.incidenceBaseProjectionProof, c.incidenceBaseProjectionType));
test('vertical line projection law', () => check([], c.verticalProjectionProof, c.verticalProjectionType));
