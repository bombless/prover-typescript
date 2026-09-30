import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateCircleCenterSndGeneralProof, translateCircleCenterSndGeneralType, reflectTriangleSecondFstProof, reflectTriangleSecondFstType, reflectTriangleSecondSndProof, reflectTriangleSecondSndType, rotateCircleCenterSndProjectionProof, rotateCircleCenterSndProjectionType } from '../src/library/geometry-transform-projections-parametric-more';

test('translated circle center second coordinate computes', () => check([], translateCircleCenterSndGeneralProof, translateCircleCenterSndGeneralType));
test('reflected triangle second vertex first coordinate computes', () => check([], reflectTriangleSecondFstProof, reflectTriangleSecondFstType));
test('reflected triangle second vertex second coordinate computes', () => check([], reflectTriangleSecondSndProof, reflectTriangleSecondSndType));
test('rotated circle center second projection computes', () => check([], rotateCircleCenterSndProjectionProof, rotateCircleCenterSndProjectionType));
