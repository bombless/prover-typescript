import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateFstGeneralProof, rotateFstGeneralType, rotateSndGeneralProof, rotateSndGeneralType, rotateTwicePointProof, rotateTwicePointType, rotateTwiceNormConcreteProof, rotateTwiceNormConcreteType } from '../src/library/geometry-rotation-laws-more';

test('rotation first projection law is kernel checked', () => check([], rotateFstGeneralProof, rotateFstGeneralType));
test('rotation second projection law is kernel checked', () => check([], rotateSndGeneralProof, rotateSndGeneralType));
test('double rotation computes a concrete point', () => check([], rotateTwicePointProof, rotateTwicePointType));
test('double rotation norm computes', () => check([], rotateTwiceNormConcreteProof, rotateTwiceNormConcreteType));
