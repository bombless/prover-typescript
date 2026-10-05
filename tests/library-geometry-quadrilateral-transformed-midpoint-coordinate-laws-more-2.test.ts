import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-quadrilateral-transformed-midpoint-coordinate-laws-more-2';
test('quadrilateral transformed diagonal midpoint law is kernel checked',()=>check([],g.firstFourthTransformedMidpointProof,g.firstFourthTransformedMidpointType));
