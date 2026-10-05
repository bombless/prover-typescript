import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-triangle-rotation-coordinate-single-laws-more';
test('triangle rotation coordinate laws are kernel checked',()=>{for(const k of ['firstVertexRotatedFst','secondVertexRotatedSnd','thirdVertexRotatedFst']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
