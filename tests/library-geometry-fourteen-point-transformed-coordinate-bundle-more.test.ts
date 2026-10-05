import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-fourteen-point-transformed-coordinate-bundle-more';
test('fourteen point transformed coordinate law is kernel checked',()=>{check([],g.fourteenthTranslatedXProof,g.fourteenthTranslatedXType);check([],g.fourteenthTranslatedYProof,g.fourteenthTranslatedYType);});
