import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateTriangleShapeProof, rotateTriangleShapeType, reflectTriangleShapeProof, reflectTriangleShapeType, rotateTriangleFirstFstProof, rotateTriangleFirstFstType, rotateTriangleThirdSndProof, rotateTriangleThirdSndType } from '../src/library/geometry-triangle-transform-parametric-laws-more';

test('rotated triangle shape is kernel checked', () => check([], rotateTriangleShapeProof, rotateTriangleShapeType));
test('reflected triangle shape is kernel checked', () => check([], reflectTriangleShapeProof, reflectTriangleShapeType));
test('rotated first vertex exposes second coordinate', () => check([], rotateTriangleFirstFstProof, rotateTriangleFirstFstType));
test('rotated third vertex exposes first coordinate', () => check([], rotateTriangleThirdSndProof, rotateTriangleThirdSndType));
