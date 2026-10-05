import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-ten-point-chain-eta-more';

test('ten-point chain eta is kernel checked', () => {
  check([], c.chain10EtaProof, c.chain10EtaType);
});
