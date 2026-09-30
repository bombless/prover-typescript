import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { transformedTriangleVertexProof, transformedTriangleVertexType, translatedCircleCenterProof, translatedCircleCenterType, lineBaseDistanceProof, lineBaseDistanceType, translatedSecondVertexProof, translatedSecondVertexType, triangleTailProjectionProof, triangleTailProjectionType, circleStructureProof, circleStructureType, lineStructureProof, lineStructureType } from '../src/library/geometry-structure-compositions';

test('transformed triangle vertex computes', () => check([], transformedTriangleVertexProof, transformedTriangleVertexType));
test('translated circle center computes', () => check([], translatedCircleCenterProof, translatedCircleCenterType));
test('line base distance computes', () => check([], lineBaseDistanceProof, lineBaseDistanceType));
test('translated triangle vertex computes', () => check([], translatedSecondVertexProof, translatedSecondVertexType));
test('triangle tail projection is kernel checked', () => check([], triangleTailProjectionProof, triangleTailProjectionType));
test('circle structure eta is kernel checked', () => check([], circleStructureProof, circleStructureType));
test('line structure eta is kernel checked', () => check([], lineStructureProof, lineStructureType));
