import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-thirteen-point-chain-eta-more';
test('thirteen-point chain eta is kernel checked', () => {
  check([], c.chain13EtaProof, c.chain13EtaType);
});
