import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-eight-point-chain-relation-bundle-more';

test('eight-point transformed chain relation bundle is kernel checked', () => {
  check([], c.chain8RelationProof, c.chain8RelationType);
});
