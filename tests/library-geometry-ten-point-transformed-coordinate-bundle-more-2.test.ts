import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-ten-point-transformed-coordinate-bundle-more-2';
test('ten point transformed coordinate law is kernel checked',()=>{check([],g.tenthTranslatedYProof,g.tenthTranslatedYType);check([],g.tenthTranslatedXProof,g.tenthTranslatedXType);});
