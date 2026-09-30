import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import {
  edgeABDistanceType, edgeABDistanceProof, edgeABDotType, edgeABDotProof, edgeABCrossType, edgeABCrossProof,
  edgeBCDistanceType, edgeBCDistanceProof, edgeBCDotType, edgeBCDotProof, edgeBCCrossType, edgeBCCrossProof,
  edgeCADistanceType, edgeCADistanceProof, edgeCADotType, edgeCADotProof, edgeCACrossType, edgeCACrossProof
} from '../src/library/geometry-triangle-edge-scalar-certificates-more';

test('edge AB distance scalar checks', () => check([], edgeABDistanceProof, edgeABDistanceType));
test('edge AB dot scalar checks', () => check([], edgeABDotProof, edgeABDotType));
test('edge AB cross scalar checks', () => check([], edgeABCrossProof, edgeABCrossType));
test('edge BC distance scalar checks', () => check([], edgeBCDistanceProof, edgeBCDistanceType));
test('edge BC dot scalar checks', () => check([], edgeBCDotProof, edgeBCDotType));
test('edge BC cross scalar checks', () => check([], edgeBCCrossProof, edgeBCCrossType));
test('edge CA distance scalar checks', () => check([], edgeCADistanceProof, edgeCADistanceType));
test('edge CA dot scalar checks', () => check([], edgeCADotProof, edgeCADotType));
test('edge CA cross scalar checks', () => check([], edgeCACrossProof, edgeCACrossType));
