import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateFourProof, rotateFourType } from '../src/library/geometry-rotations';

test('four rotations restore every point', () => check([], rotateFourProof, rotateFourType));
