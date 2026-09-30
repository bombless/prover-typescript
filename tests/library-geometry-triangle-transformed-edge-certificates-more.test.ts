import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { edgeABType, edgeABProof, edgeBCType, edgeBCProof, edgeCAType, edgeCAProof } from '../src/library/geometry-triangle-transformed-edge-certificates-more';

test('transformed triangle edge AB', () => check([], edgeABProof, edgeABType));
test('transformed triangle edge BC', () => check([], edgeBCProof, edgeBCType));
test('transformed triangle edge CA', () => check([], edgeCAProof, edgeCAType));
