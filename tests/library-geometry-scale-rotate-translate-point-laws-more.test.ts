import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-scale-rotate-translate-point-laws-more';

test('scale then translate point coordinate law', () => check([], c.scaleTranslateProof, c.scaleTranslateType));
test('reflect after rotate coordinate law', () => check([], c.reflectRotateProof, c.reflectRotateType));
