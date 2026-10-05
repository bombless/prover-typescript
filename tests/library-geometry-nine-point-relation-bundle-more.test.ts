import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-nine-point-relation-bundle-more';

test('nine-point full relation bundle is kernel checked', () => {
  check([], c.chain9RelationProof, c.chain9RelationType);
});
