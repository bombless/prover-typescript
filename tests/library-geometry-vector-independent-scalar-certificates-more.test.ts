import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { uvDotType, uvDotProof, uvCrossType, uvCrossProof, uNormType, uNormProof, vNormType, vNormProof } from '../src/library/geometry-vector-independent-scalar-certificates-more';

test('uv dot scalar check', () => check([], uvDotProof, uvDotType));
test('uv cross scalar check', () => check([], uvCrossProof, uvCrossType));
test('u norm scalar check', () => check([], uNormProof, uNormType));
test('v norm scalar check', () => check([], vNormProof, vNormType));
