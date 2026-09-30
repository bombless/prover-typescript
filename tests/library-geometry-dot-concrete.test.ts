import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { dotAxisConcreteProof, dotAxisConcreteType } from '../src/library/geometry-metrics';
test('concrete dot product is kernel checked after reduction improvements', () => check([], dotAxisConcreteProof, dotAxisConcreteType));
