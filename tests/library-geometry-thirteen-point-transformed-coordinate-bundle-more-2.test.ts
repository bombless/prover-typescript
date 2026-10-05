import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-thirteen-point-transformed-coordinate-bundle-more-2';
test('thirteen point transformed coordinate law is kernel checked',()=>{check([],g.thirteenthTranslatedYProof,g.thirteenthTranslatedYType);check([],g.thirteenthTranslatedXProof,g.thirteenthTranslatedXType);});
