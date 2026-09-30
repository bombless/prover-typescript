import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { addVecChainProof, addVecChainType, scaleThenAddProof, scaleThenAddType, scaleThenAddFstProof, scaleThenAddFstType, scaleThenAddSndProof, scaleThenAddSndType } from '../src/library/geometry-vector-more';

test('vector addition chain computes', () => check([], addVecChainProof, addVecChainType));
test('scaled vector addition computes', () => check([], scaleThenAddProof, scaleThenAddType));
test('scaled vector addition first projection computes', () => check([], scaleThenAddFstProof, scaleThenAddFstType));
test('scaled vector addition second projection computes', () => check([], scaleThenAddSndProof, scaleThenAddSndType));
