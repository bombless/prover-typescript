import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-eight-point-transformed-coordinate-bundle-more';
test('eight point transformed coordinate law is kernel checked',()=>{check([],g.eighthTranslatedYProof,g.eighthTranslatedYType);check([],g.eighthTranslatedXProof,g.eighthTranslatedXType);});
