import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import {
  edgeABDistanceType, edgeABDistanceProof, edgeABDotType, edgeABDotProof, edgeABCrossType, edgeABCrossProof,
  edgeBCDistanceType, edgeBCDistanceProof, edgeBCDotType, edgeBCDotProof, edgeBCCrossType, edgeBCCrossProof,
  edgeCADistanceType, edgeCADistanceProof, edgeCADotType, edgeCADotProof, edgeCACrossType, edgeCACrossProof
} from '../src/library/geometry-triangle-individual-vector-certificates-more';

test('triangle AB distance checks', () => check([], edgeABDistanceProof, edgeABDistanceType));
test('triangle AB dot checks', () => check([], edgeABDotProof, edgeABDotType));
test('triangle AB cross checks', () => check([], edgeABCrossProof, edgeABCrossType));
test('triangle BC distance checks', () => check([], edgeBCDistanceProof, edgeBCDistanceType));
test('triangle BC dot checks', () => check([], edgeBCDotProof, edgeBCDotType));
test('triangle BC cross checks', () => check([], edgeBCCrossProof, edgeBCCrossType));
test('triangle CA distance checks', () => check([], edgeCADistanceProof, edgeCADistanceType));
test('triangle CA dot checks', () => check([], edgeCADotProof, edgeCADotType));
test('triangle CA cross checks', () => check([], edgeCACrossProof, edgeCACrossType));
