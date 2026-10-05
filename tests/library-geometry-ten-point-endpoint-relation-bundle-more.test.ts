import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-ten-point-endpoint-relation-bundle-more';
test('ten-point endpoint relation bundle is kernel checked',()=>{check([],c.chain10EndpointRelationProof,c.chain10EndpointRelationType);});
