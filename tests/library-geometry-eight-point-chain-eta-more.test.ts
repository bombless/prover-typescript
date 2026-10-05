import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-eight-point-chain-eta-more';

test('eight-point chain eta is kernel checked', () => {
  check([], c.chain8EtaProof, c.chain8EtaType);
});
