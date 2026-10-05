import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-triangle-scale-coordinate-single-laws-more-2';
test('more triangle scale coordinate laws are kernel checked',()=>{for(const k of ['firstVertexScaledY','secondVertexScaledX','thirdVertexScaledY']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
