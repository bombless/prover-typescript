import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateTriangleFirstFstProof, rotateTriangleFirstFstType, rotateTriangleFirstSndProof, rotateTriangleFirstSndType, translateTriangleThirdProof, translateTriangleThirdType, circleCenterProjectionProof, circleCenterProjectionType, circleRadiusProjectionProof, circleRadiusProjectionType } from '../src/library/geometry-structure-parametric-laws-more';

test('rotated triangle first x projection law is kernel checked', () => check([], rotateTriangleFirstFstProof, rotateTriangleFirstFstType));
test('rotated triangle first y projection law is kernel checked', () => check([], rotateTriangleFirstSndProof, rotateTriangleFirstSndType));
test('translated triangle third expression is kernel checked', () => check([], translateTriangleThirdProof, translateTriangleThirdType));
test('circle center projection law is kernel checked', () => check([], circleCenterProjectionProof, circleCenterProjectionType));
test('circle radius projection law is kernel checked', () => check([], circleRadiusProjectionProof, circleRadiusProjectionType));
