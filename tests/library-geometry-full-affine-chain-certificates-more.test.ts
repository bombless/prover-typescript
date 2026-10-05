import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-full-affine-chain-certificates-more';

test('full affine chain point formula', () => check([], c.affineChainPointProof, c.affineChainPointType));
test('full affine chain first coordinate', () => check([], c.affineChainFstProof, c.affineChainFstType));
test('full affine chain second coordinate', () => check([], c.affineChainSndProof, c.affineChainSndType));
test('closed full affine chain', () => check([], c.affineChainConcreteProof, c.affineChainConcreteType));
