import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-eight-point-endpoint-midpoint-relation-more';

test('eight-point endpoint midpoint relation is kernel checked', () => {
  check([], c.chain8EndpointMidpointRelationProof, c.chain8EndpointMidpointRelationType);
});
