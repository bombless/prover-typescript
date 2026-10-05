import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-nine-point-transformed-coordinate-bundle-more';
test('nine point transformed coordinate law is kernel checked',()=>check([],g.ninthTranslatedXProof,g.ninthTranslatedXType));
