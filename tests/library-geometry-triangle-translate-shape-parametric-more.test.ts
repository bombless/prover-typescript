import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateTriangleShapeProof, translateTriangleShapeType, translateTriangleFirstVertexProof, translateTriangleFirstVertexType } from '../src/library/geometry-triangle-translate-shape-parametric-more';
test('translated triangle preserves nested shape', () => check([], translateTriangleShapeProof, translateTriangleShapeType));
test('translated triangle first vertex remains accessible', () => check([], translateTriangleFirstVertexProof, translateTriangleFirstVertexType));
