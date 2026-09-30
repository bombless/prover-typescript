import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateLargerProof, rotateLargerType } from '../src/library/geometry-rotations';
test('larger coordinate rotation is kernel checked', () => check([], rotateLargerProof, rotateLargerType));
