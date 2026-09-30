import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { predSubProof, predSubType, subPredProof, subPredType, underflowPredProof, underflowPredType } from '../src/library/nat-pred-sub-more';

test('predecessor after subtraction computes', () => check([], predSubProof, predSubType));
test('subtraction after predecessor computes', () => check([], subPredProof, subPredType));
test('predecessor preserves subtraction underflow', () => check([], underflowPredProof, underflowPredType));
