import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-hexagon-reflection-coordinate-single-laws-more';
test('hexagon reflection coordinate law is kernel checked',()=>check([],g.sixthVertexReflectedXProof,g.sixthVertexReflectedXType));
