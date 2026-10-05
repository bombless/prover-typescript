import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-ten-point-endpoint-midpoint-relation-more';
test('ten-point endpoint midpoint relation is kernel checked', () => { check([], c.chain10EndpointMidpointRelationProof, c.chain10EndpointMidpointRelationType); });
