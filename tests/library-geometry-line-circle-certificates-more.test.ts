import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { lineCirclePairProof,lineCirclePairType,rotatedFirstCoordinateProof,rotatedFirstCoordinateType,rotatedSecondCoordinateProof,rotatedSecondCoordinateType } from '../src/library/geometry-line-circle-certificates-more';
test('a concrete point carries line and circle certificates',()=>check([],lineCirclePairProof,lineCirclePairType));
test('rotation first-coordinate projection is kernel checked',()=>check([],rotatedFirstCoordinateProof,rotatedFirstCoordinateType));
test('rotation second-coordinate projection is kernel checked',()=>check([],rotatedSecondCoordinateProof,rotatedSecondCoordinateType));
