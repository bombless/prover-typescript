import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-eight-point-endpoint-relation-bundle-more';

test('eight-point endpoint relation bundle is kernel checked', () => {
  check([], c.chain8EndpointRelationProof, c.chain8EndpointRelationType);
});
