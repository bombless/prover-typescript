import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateCircleRadiusProof, translateCircleRadiusType, rotateCircleRadiusProof, rotateCircleRadiusType, reflectCircleRadiusProof, reflectCircleRadiusType, translateCircleCenterFstGeneralProof, translateCircleCenterFstGeneralType, rotateCircleCenterSndGeneralProof, rotateCircleCenterSndGeneralType } from '../src/library/geometry-circle-structure-parametric-more';

test('translated circle keeps radius', () => check([], translateCircleRadiusProof, translateCircleRadiusType));
test('rotated circle keeps radius', () => check([], rotateCircleRadiusProof, rotateCircleRadiusType));
test('reflected circle keeps radius', () => check([], reflectCircleRadiusProof, reflectCircleRadiusType));
test('translated circle center first coordinate computes', () => check([], translateCircleCenterFstGeneralProof, translateCircleCenterFstGeneralType));
test('rotated circle center second coordinate computes', () => check([], rotateCircleCenterSndGeneralProof, rotateCircleCenterSndGeneralType));
