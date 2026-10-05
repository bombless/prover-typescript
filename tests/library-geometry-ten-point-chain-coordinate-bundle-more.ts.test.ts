import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-ten-point-chain-coordinate-bundle-more';
test('ten point coordinate bundle is kernel checked',()=>{check([],g.tenthXProof,g.tenthXType);check([],g.tenthYProof,g.tenthYType);});
