import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-triangle-rotation-coordinate-single-laws-more-2';
test('more triangle rotation coordinate laws are kernel checked',()=>{for(const k of ['firstVertexRotatedSnd','secondVertexRotatedFst','thirdVertexRotatedSnd']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
