import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-triangle-transformed-midpoint-coordinate-laws-more-4';
test('first third transformed midpoint law is kernel checked',()=>check([],g.firstThirdTransformedMidpointProof,g.firstThirdTransformedMidpointType));
