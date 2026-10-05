import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-hexagon-transform-coordinate-single-laws-more';
test('hexagon transform coordinate law is kernel checked',()=>check([],g.sixthVertexTranslatedXProof,g.sixthVertexTranslatedXType));
