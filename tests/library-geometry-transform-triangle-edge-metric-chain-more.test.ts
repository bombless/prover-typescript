import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transform-triangle-edge-metric-chain-more';

test('transformed metric triangle A', () => check([], c.taProof, c.taType));
test('transformed metric triangle B', () => check([], c.tbProof, c.tbType));
test('transformed metric triangle C', () => check([], c.tcProof, c.tcType));
test('transformed metric C norm', () => check([], c.tcNormProof, c.tcNormType));
