import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-triangle-scale-coordinate-single-laws-more';
test('triangle scale coordinate laws are kernel checked',()=>{for(const k of ['firstVertexScaledX','secondVertexScaledY','thirdVertexScaledX']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
