import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-rotate-reflect-triangle-chain-certificates-more';

test('rotate reflect triangle A', () => check([], c.aProof, c.aType));
test('rotate reflect triangle B', () => check([], c.bProof, c.bType));
test('rotate reflect triangle C', () => check([], c.cProof, c.cType));
test('rotate reflect C norm', () => check([], c.cNormProof, c.cNormType));
