import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-circle-transform-composite-laws-more';

test('translated circle center full coordinate law', () => check([], c.translatedCircleCenterProof, c.translatedCircleCenterType));
test('rotated circle center full coordinate law', () => check([], c.rotatedCircleCenterProof, c.rotatedCircleCenterType));
