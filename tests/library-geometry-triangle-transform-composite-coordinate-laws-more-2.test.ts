import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-triangle-transform-composite-coordinate-laws-more-2';
test('triangle composite transform coordinate laws are kernel checked',()=>{for(const k of ['secondVertexRotateTranslateX','thirdVertexRotateTranslateY']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
