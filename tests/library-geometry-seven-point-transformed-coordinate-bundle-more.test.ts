import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-seven-point-transformed-coordinate-bundle-more';
test('seven point transformed coordinate law is kernel checked',()=>check([],g.seventhTranslatedXProof,g.seventhTranslatedXType));
