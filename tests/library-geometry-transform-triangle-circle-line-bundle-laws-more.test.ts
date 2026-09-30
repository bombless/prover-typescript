import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transform-triangle-circle-line-bundle-laws-more';

test('translated triangle first vertex law', () => check([], c.translatedFirstVertexProof, c.translatedFirstVertexType));
test('rotated circle center law', () => check([], c.rotatedCircleCenterProof, c.rotatedCircleCenterType));
test('translated line direction law', () => check([], c.translatedLineDirectionProof, c.translatedLineDirectionType));
