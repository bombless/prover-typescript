import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transform-circle-line-radius-direction-laws-more';

test('rotated circle radius remains', () => check([], c.rotatedCircleRadiusProof, c.rotatedCircleRadiusType));
test('reflected circle radius remains', () => check([], c.reflectedCircleRadiusProof, c.reflectedCircleRadiusType));
test('translated line direction remains', () => check([], c.translatedLineDirectionProof, c.translatedLineDirectionType));
test('rotated line direction remains', () => check([], c.rotatedLineDirectionProof, c.rotatedLineDirectionType));
