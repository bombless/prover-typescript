import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-seven-point-coordinate-bundle-more-2';
test('seven point coordinate bundle is kernel checked',()=>{check([],g.seventhXProof,g.seventhXType);check([],g.seventhYProof,g.seventhYType);});
