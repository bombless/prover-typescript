import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import {
  vertexADotType, vertexADotProof, vertexANormType, vertexANormProof, vertexACrossType, vertexACrossProof,
  vertexBDotType, vertexBDotProof, vertexBNormType, vertexBNormProof, vertexBCrossType, vertexBCrossProof,
  vertexCDotType, vertexCDotProof, vertexCNormType, vertexCNormProof, vertexCCrossType, vertexCCrossProof
} from '../src/library/geometry-triangle-vertex-metric-certificates-more';

test('vertex A dot checks', () => check([], vertexADotProof, vertexADotType));
test('vertex A norm checks', () => check([], vertexANormProof, vertexANormType));
test('vertex A cross checks', () => check([], vertexACrossProof, vertexACrossType));
test('vertex B dot checks', () => check([], vertexBDotProof, vertexBDotType));
test('vertex B norm checks', () => check([], vertexBNormProof, vertexBNormType));
test('vertex B cross checks', () => check([], vertexBCrossProof, vertexBCrossType));
test('vertex C dot checks', () => check([], vertexCDotProof, vertexCDotType));
test('vertex C norm checks', () => check([], vertexCNormProof, vertexCNormType));
test('vertex C cross checks', () => check([], vertexCCrossProof, vertexCCrossType));
