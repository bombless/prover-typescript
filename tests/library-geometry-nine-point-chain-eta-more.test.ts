import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-nine-point-chain-eta-more';

test('nine-point chain eta is kernel checked', () => {
  check([], c.chain9EtaProof, c.chain9EtaType);
});
