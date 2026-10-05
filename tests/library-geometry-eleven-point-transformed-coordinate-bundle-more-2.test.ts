import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-eleven-point-transformed-coordinate-bundle-more-2';
test('eleven point transformed coordinate law is kernel checked',()=>check([],g.eleventhTranslatedYProof,g.eleventhTranslatedYType));
