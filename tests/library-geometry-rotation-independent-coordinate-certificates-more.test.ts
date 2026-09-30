import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateFstCoordinateType, rotateFstCoordinateProof, rotateSndCoordinateType, rotateSndCoordinateProof, rotateTwiceFstCoordinateType, rotateTwiceFstCoordinateProof, rotateTwiceSndCoordinateType, rotateTwiceSndCoordinateProof } from '../src/library/geometry-rotation-independent-coordinate-certificates-more';

test('rotation first coordinate check', () => check([], rotateFstCoordinateProof, rotateFstCoordinateType));
test('rotation second coordinate check', () => check([], rotateSndCoordinateProof, rotateSndCoordinateType));
test('double rotation first coordinate check', () => check([], rotateTwiceFstCoordinateProof, rotateTwiceFstCoordinateType));
test('double rotation second coordinate check', () => check([], rotateTwiceSndCoordinateProof, rotateTwiceSndCoordinateType));
