import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-twelve-point-transformed-coordinate-bundle-more-2';
test('twelve point transformed coordinate law is kernel checked',()=>{check([],g.twelfthTranslatedXProof,g.twelfthTranslatedXType);check([],g.twelfthTranslatedYProof,g.twelfthTranslatedYType);});
