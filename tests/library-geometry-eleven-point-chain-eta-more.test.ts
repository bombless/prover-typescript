import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-eleven-point-chain-eta-more';

test('eleven-point chain eta is kernel checked', () => {
  check([], c.chain11EtaProof, c.chain11EtaType);
});
