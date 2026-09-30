import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { sumFstType, sumFstProof, sumSndType, sumSndProof, zeroLeftFstType, zeroLeftFstProof, zeroRightSndType, zeroRightSndProof } from '../src/library/geometry-vector-add-independent-coordinate-certificates-more';

test('vector sum first coordinate check', () => check([], sumFstProof, sumFstType));
test('vector sum second coordinate check', () => check([], sumSndProof, sumSndType));
test('zero left vector first coordinate check', () => check([], zeroLeftFstProof, zeroLeftFstType));
test('zero right vector second coordinate check', () => check([], zeroRightSndProof, zeroRightSndType));
