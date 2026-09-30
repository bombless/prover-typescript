import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { triangleTailVertexRotateProof, triangleTailVertexRotateType, translatedCircleRadiusProof, translatedCircleRadiusType, rotatedLineDirectionProof, rotatedLineDirectionType, translatedLineBaseProof, translatedLineBaseType } from '../src/library/geometry-structure-transform-more';

test('rotated triangle tail vertex computes', () => check([], triangleTailVertexRotateProof, triangleTailVertexRotateType));
test('translated circle radius projection computes', () => check([], translatedCircleRadiusProof, translatedCircleRadiusType));
test('rotated line direction computes', () => check([], rotatedLineDirectionProof, rotatedLineDirectionType));
test('translated line base computes', () => check([], translatedLineBaseProof, translatedLineBaseType));
