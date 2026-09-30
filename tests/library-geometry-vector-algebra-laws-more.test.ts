import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleAddFstType, scaleAddFstProof, scaleAddSndType, scaleAddSndProof, scaleComposeFstType, scaleComposeFstProof, scaleComposeSndType, scaleComposeSndProof, translateComposeFstType, translateComposeFstProof, translateComposeSndType, translateComposeSndProof } from '../src/library/geometry-vector-algebra-laws-more';

test('scale vector sum first coordinate law', () => check([], scaleAddFstProof, scaleAddFstType));
test('scale vector sum second coordinate law', () => check([], scaleAddSndProof, scaleAddSndType));
test('successive scale first coordinate law', () => check([], scaleComposeFstProof, scaleComposeFstType));
test('successive scale second coordinate law', () => check([], scaleComposeSndProof, scaleComposeSndType));
test('successive translation first coordinate law', () => check([], translateComposeFstProof, translateComposeFstType));
test('successive translation second coordinate law', () => check([], translateComposeSndProof, translateComposeSndType));
