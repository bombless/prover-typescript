import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-line-circle-structure-composite-laws-more';

test('translated line full structural law', () => check([], c.translatedLineFullProof, c.translatedLineFullType));
test('rotated circle full structural law', () => check([], c.rotatedCircleFullProof, c.rotatedCircleFullType));
