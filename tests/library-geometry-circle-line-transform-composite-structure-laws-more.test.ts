import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-circle-line-transform-composite-structure-laws-more';

test('rotated translated circle center law', () => check([], c.rotatedTranslatedCircleCenterProof, c.rotatedTranslatedCircleCenterType));
test('rotated translated line base law', () => check([], c.rotatedTranslatedLineBaseProof, c.rotatedTranslatedLineBaseType));
