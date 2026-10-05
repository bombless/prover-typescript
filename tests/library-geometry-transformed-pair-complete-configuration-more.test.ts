import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transformed-pair-complete-configuration-more';

test('transformed pair complete configuration is kernel checked', () => {
  check([], c.pairMetricProof, c.pairMetricType);
  check([], c.pairMidpointRelationProof, c.pairMidpointRelationType);
});
