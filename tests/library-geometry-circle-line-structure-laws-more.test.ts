import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateCircleStructureType, rotateCircleStructureProof, translateLineStructureType, translateLineStructureProof, rotateLineStructureDirectionType, rotateLineStructureDirectionProof } from '../src/library/geometry-circle-line-structure-laws-more';

test('rotated circle structural law', () => check([], rotateCircleStructureProof, rotateCircleStructureType));
test('translated line structural law', () => check([], translateLineStructureProof, translateLineStructureType));
test('rotated line direction structural law', () => check([], rotateLineStructureDirectionProof, rotateLineStructureDirectionType));
