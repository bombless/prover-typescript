import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-triangle-reflection-coordinate-single-laws-more';
test('triangle reflection coordinate laws are kernel checked',()=>{for(const k of ['firstVertexReflectedX','secondVertexReflectedY','thirdVertexReflectedX']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
