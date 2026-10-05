import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-triangle-transformed-midpoint-coordinate-laws-more-2';
test('second third transformed midpoint law is kernel checked',()=>check([],g.secondThirdTransformedMidpointProof,g.secondThirdTransformedMidpointType));
