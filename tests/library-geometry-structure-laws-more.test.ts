import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translatedPairProof, translatedPairType, rotatedPairProof, rotatedPairType, triangleTailTransformProof, triangleTailTransformType, circleCenterTransformProof, circleCenterTransformType, triangleEtaMoreProof, triangleEtaMoreType, circleEtaMoreProof, circleEtaMoreType } from '../src/library/geometry-structure-laws-more';
test('translated pair reconstruction is kernel checked', () => check([], translatedPairProof, translatedPairType));
test('rotated pair reconstruction is kernel checked', () => check([], rotatedPairProof, rotatedPairType));
test('rotated triangle tail computes', () => check([], triangleTailTransformProof, triangleTailTransformType));
test('rotated circle center computes', () => check([], circleCenterTransformProof, circleCenterTransformType));
test('triangle eta reconstruction is kernel checked', () => check([], triangleEtaMoreProof, triangleEtaMoreType));
test('circle eta reconstruction is kernel checked', () => check([], circleEtaMoreProof, circleEtaMoreType));
