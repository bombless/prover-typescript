import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { predNineProof, predNineType, predPredNineProof, predPredNineType, predZeroAgainProof, predZeroAgainType, predSuccSevenProof, predSuccSevenType } from '../src/library/nat-pred-compositions-more';

test('predecessor of nine computes', () => check([], predNineProof, predNineType));
test('two predecessors of nine compute', () => check([], predPredNineProof, predPredNineType));
test('predecessor preserves zero under repetition', () => check([], predZeroAgainProof, predZeroAgainType));
test('predecessor of a successor computes', () => check([], predSuccSevenProof, predSuccSevenType));
