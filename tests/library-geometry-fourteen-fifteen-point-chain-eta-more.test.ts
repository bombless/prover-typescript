import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-fourteen-fifteen-point-chain-eta-more';

test('fourteen and fifteen point chain eta are kernel checked', () => {
  check([], c.chain14EtaProof, c.chain14EtaType);
  check([], c.chain15EtaProof, c.chain15EtaType);
  check([], c.chain15VertexProjectionProof, c.chain15VertexProjectionType);
  check([], c.chain16EtaProof, c.chain16EtaType);
  check([], c.chain17EtaProof, c.chain17EtaType);
  check([], c.chain18EtaProof, c.chain18EtaType);
  check([], c.chain19EtaProof, c.chain19EtaType);
  check([], c.chain20EtaProof, c.chain20EtaType);
  for (const i of [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] as const) {
    check([], c[`chain${i}EtaProof`], c[`chain${i}EtaType`]);
  }
});
