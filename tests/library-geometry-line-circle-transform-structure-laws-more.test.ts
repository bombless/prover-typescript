import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-line-circle-transform-structure-laws-more';

test('translated line base coordinate structure', () => check([], c.translatedLineBaseProof, c.translatedLineBaseType));
test('rotated circle center coordinate structure', () => check([], c.rotatedCircleCenterProof, c.rotatedCircleCenterType));
