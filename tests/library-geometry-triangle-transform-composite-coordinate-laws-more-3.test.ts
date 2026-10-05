import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-triangle-transform-composite-coordinate-laws-more-3';
test('triangle scale rotate translate laws are kernel checked',()=>{for(const k of ['firstVertexScaleRotateTranslateX','thirdVertexScaleRotateTranslateY']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
