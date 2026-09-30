import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { zeroRightAngleProof, zeroRightAngleType } from '../src/library/geometry-angle';

test('zero angle relation is kernel checked', () => check([], zeroRightAngleProof, zeroRightAngleType));
