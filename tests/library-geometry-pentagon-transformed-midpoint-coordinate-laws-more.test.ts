import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-pentagon-transformed-midpoint-coordinate-laws-more';
test('pentagon transformed midpoint law is kernel checked',()=>check([],g.firstFifthTransformedMidpointProof,g.firstFifthTransformedMidpointType));
