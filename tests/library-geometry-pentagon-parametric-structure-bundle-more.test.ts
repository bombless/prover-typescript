import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-pentagon-parametric-structure-bundle-more';

test('parametric pentagon structure and endpoint relations are kernel checked', () => {
  check([], c.pentagonEtaProof, c.pentagonEtaType);
  check([], c.pentagonEndRelationProof, c.pentagonEndRelationType);
  check([], c.pentagonAllRelationProof, c.pentagonAllRelationType);
});
