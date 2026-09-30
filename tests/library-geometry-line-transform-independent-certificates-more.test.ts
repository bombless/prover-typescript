import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-line-transform-independent-certificates-more';

test('translated line base coordinates', () => check([], c.translatedBaseProof, c.translatedBaseType));
test('rotated line direction coordinates', () => check([], c.rotatedDirectionProof, c.rotatedDirectionType));
test('translated line base vertical membership', () => check([], c.translatedBaseVerticalProof, c.translatedBaseVerticalType));
test('translated line base incidence', () => check([], c.translatedBaseIncidenceProof, c.translatedBaseIncidenceType));
