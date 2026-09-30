import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateTwiceLargerProof, rotateTwiceLargerType } from '../src/library/geometry-rotations';
test('concrete double rotation is kernel checked', () => check([], rotateTwiceLargerProof, rotateTwiceLargerType));
