import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-quadrilateral-transform-coordinate-single-laws-more-2';
test('more quadrilateral transform coordinate laws are kernel checked',()=>{for(const k of ['thirdVertexTranslatedY','firstVertexRotatedX']) check([], (g as any)[k+'Proof'], (g as any)[k+'Type']);});
