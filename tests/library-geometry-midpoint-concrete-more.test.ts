import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { midpointConcreteProof, midpointConcreteType } from '../src/library/geometry-segment';
test('concrete midpoint construction is kernel checked', () => check([], midpointConcreteProof, midpointConcreteType));
