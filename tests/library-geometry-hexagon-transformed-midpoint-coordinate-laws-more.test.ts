import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-hexagon-transformed-midpoint-coordinate-laws-more';
test('hexagon transformed midpoint law is kernel checked',()=>check([],g.firstSixthTransformedMidpointProof,g.firstSixthTransformedMidpointType));
