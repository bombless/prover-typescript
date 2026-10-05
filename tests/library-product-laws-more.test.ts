import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as p from '../src/library/product-laws-more';
test('additional product laws are kernel checked', () => {
  check([], p.concretePairFstProof, p.concretePairFstType);
  check([], p.concretePairSndProof, p.concretePairSndType);
  check([], p.concretePairEtaProof, p.concretePairEtaType);
});
