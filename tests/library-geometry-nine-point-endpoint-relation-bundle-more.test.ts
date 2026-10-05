import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-nine-point-endpoint-relation-bundle-more';

test('nine-point endpoint relation bundle is kernel checked', () => {
  check([], c.chain9EndpointRelationProof, c.chain9EndpointRelationType);
});
