import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-six-point-parametric-chain-relation-bundle-more';

test('six-point parametric chain relations are kernel checked', () => {
  check([], c.chainRelationProof, c.chainRelationType);
  check([], c.chainLastProof, c.chainLastType);
  check([], c.chainAllRelationProof, c.chainAllRelationType);
});
