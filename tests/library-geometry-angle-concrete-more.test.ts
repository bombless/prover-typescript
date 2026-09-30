import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { axisRightAngleConcreteProof, axisRightAngleConcreteType } from '../src/library/geometry-angle';
test('concrete axis right-angle dot product is kernel checked', () => check([], axisRightAngleConcreteProof, axisRightAngleConcreteType));
