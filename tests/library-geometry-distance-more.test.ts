import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { distanceConcreteProof, distanceConcreteType } from '../src/library/geometry-distance';
test('concrete squared distance is kernel checked after reduction improvements', () => check([], distanceConcreteProof, distanceConcreteType));
