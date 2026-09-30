import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-circle-line-vertex-projection-laws-more';

test('translated circle center projection', () => check([], c.translatedCircleCenterProof, c.translatedCircleCenterType));
test('rotated line base projection', () => check([], c.rotatedLineBaseProof, c.rotatedLineBaseType));
