import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/nat-equality-composition-more';

test('natural equality composition laws are kernel checked', () => {
  check([], c.natSymmProof, c.natSymmType);
  check([], c.natSuccCongrProof, c.natSuccCongrType);
  check([], c.natTransConcreteProof, c.natTransConcreteType);
});
