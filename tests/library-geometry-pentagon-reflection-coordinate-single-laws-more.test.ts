import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-pentagon-reflection-coordinate-single-laws-more';
test('pentagon reflection coordinate law is kernel checked',()=>check([],g.fifthVertexReflectedYProof,g.fifthVertexReflectedYType));
