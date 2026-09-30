import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointEtaProof, midpointEtaType } from '../src/library/geometry-segment';

test('midpoint eta law is kernel checked', () => check([], midpointEtaProof, midpointEtaType));
