import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-seven-point-parametric-chain-relation-bundle-more';

test('seven-point parametric chain relations are kernel checked', () => {
  check([], c.chain7RelationProof, c.chain7RelationType);
});
