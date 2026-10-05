import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-four-stage-relation-product-laws-more';

test('four-stage relation product is kernel checked', () => {
  check([], c.transformedRelationProductProof, c.transformedRelationProductType);
});
