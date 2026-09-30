import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateTriangleEtaType, rotateTriangleEtaProof, reflectCircleEtaType, reflectCircleEtaProof, translateLineEtaType, translateLineEtaProof } from '../src/library/geometry-transform-structure-coordinate-laws-more';

test('rotated triangle eta structure', () => check([], rotateTriangleEtaProof, rotateTriangleEtaType));
test('reflected circle eta structure', () => check([], reflectCircleEtaProof, reflectCircleEtaType));
test('translated line eta structure', () => check([], translateLineEtaProof, translateLineEtaType));
