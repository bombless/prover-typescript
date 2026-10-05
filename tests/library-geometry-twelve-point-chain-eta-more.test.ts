import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-twelve-point-chain-eta-more';
test('twelve-point chain eta is kernel checked', () => {
  check([], c.chain12EtaProof, c.chain12EtaType);
});
