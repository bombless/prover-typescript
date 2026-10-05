import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-triangle-transform-coordinate-single-laws-more-2';
test('more triangle transformed coordinate laws are kernel checked',()=>{for(const k of ['firstVertexTranslatedY','secondVertexTranslatedY','thirdVertexTranslatedX']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
