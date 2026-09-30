import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { chainPointProof, chainPointType, chainFstProof, chainFstType, chainSndProof, chainSndType, chainNormProof, chainNormType, chainDotProof, chainDotType } from '../src/library/geometry-composition-chain-more';

test('three-stage point transformation computes', () => check([], chainPointProof, chainPointType));
test('three-stage point first projection computes', () => check([], chainFstProof, chainFstType));
test('three-stage point second projection computes', () => check([], chainSndProof, chainSndType));
test('three-stage point norm computes', () => check([], chainNormProof, chainNormType));
test('three-stage point dot product computes', () => check([], chainDotProof, chainDotType));
