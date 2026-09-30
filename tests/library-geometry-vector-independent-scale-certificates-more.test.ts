import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleTwoType, scaleTwoProof, scaleThreeType, scaleThreeProof, scaleZeroType, scaleZeroProof, scaleOneType, scaleOneProof } from '../src/library/geometry-vector-independent-scale-certificates-more';

test('scale two checks', () => check([], scaleTwoProof, scaleTwoType));
test('scale three checks', () => check([], scaleThreeProof, scaleThreeType));
test('scale zero checks', () => check([], scaleZeroProof, scaleZeroType));
test('scale one checks', () => check([], scaleOneProof, scaleOneType));
