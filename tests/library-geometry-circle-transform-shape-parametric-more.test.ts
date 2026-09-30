import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateCircleShapeProof, translateCircleShapeType, rotateCircleShapeProof, rotateCircleShapeType, reflectCircleShapeProof, reflectCircleShapeType } from '../src/library/geometry-circle-transform-shape-parametric-more';
test('translated circle preserves center-radius shape', () => check([], translateCircleShapeProof, translateCircleShapeType));
test('rotated circle preserves center-radius shape', () => check([], rotateCircleShapeProof, rotateCircleShapeType));
test('reflected circle preserves center-radius shape', () => check([], reflectCircleShapeProof, reflectCircleShapeType));
