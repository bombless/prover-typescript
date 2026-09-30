import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { chainOneProof, chainOneType, chainTwoProof, chainTwoType, chainThreeProof, chainThreeType, chainFourProof, chainFourType } from '../src/library/nat-arithmetic-chain-more';

test('long arithmetic chain one computes', () => check([], chainOneProof, chainOneType));
test('long arithmetic chain two computes', () => check([], chainTwoProof, chainTwoType));
test('long arithmetic chain three computes', () => check([], chainThreeProof, chainThreeType));
test('long arithmetic chain four computes', () => check([], chainFourProof, chainFourType));
