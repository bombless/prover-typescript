import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-eleven-point-coordinate-bundle-more-2';
test('eleven point coordinate bundle is kernel checked',()=>{check([],g.eleventhXProof,g.eleventhXType);check([],g.eleventhYProof,g.eleventhYType);});
