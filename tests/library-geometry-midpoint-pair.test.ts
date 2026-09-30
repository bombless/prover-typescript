import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointPairProof, midpointPairType } from '../src/library/geometry-segment';

test('midpoint pair formula is kernel checked', () => check([], midpointPairProof, midpointPairType));
