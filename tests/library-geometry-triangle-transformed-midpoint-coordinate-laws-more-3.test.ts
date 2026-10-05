import test from 'node:test'; import { check } from '../src/kernel/typecheck'; import * as g from '../src/library/geometry-triangle-transformed-midpoint-coordinate-laws-more-3';
test('scaled transformed triangle midpoint law is kernel checked',()=>check([],g.firstThirdScaledMidpointProof,g.firstThirdScaledMidpointType));
