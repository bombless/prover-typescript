import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateNormType, rotateNormProof, rotateTwiceNormType, rotateTwiceNormProof } from '../src/library/geometry-rotation-independent-norm-certificates-more';

test('rotation norm check', () => check([], rotateNormProof, rotateNormType));
test('double rotation norm check', () => check([], rotateTwiceNormProof, rotateTwiceNormType));
