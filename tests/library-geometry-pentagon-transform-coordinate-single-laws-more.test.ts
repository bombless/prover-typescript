import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-pentagon-transform-coordinate-single-laws-more';
test('pentagon transform coordinate law is kernel checked',()=>check([],g.fifthVertexTranslatedYProof,g.fifthVertexTranslatedYType));
