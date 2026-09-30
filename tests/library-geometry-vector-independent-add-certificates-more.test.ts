import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { uvSumType, uvSumProof, vuSumType, vuSumProof, zeroLeftSumType, zeroLeftSumProof, zeroRightSumType, zeroRightSumProof } from '../src/library/geometry-vector-independent-add-certificates-more';

test('vector u+v check', () => check([], uvSumProof, uvSumType));
test('vector v+u check', () => check([], vuSumProof, vuSumType));
test('zero+vector check', () => check([], zeroLeftSumProof, zeroLeftSumType));
test('vector+zero check', () => check([], zeroRightSumProof, zeroRightSumType));
