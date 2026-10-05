import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as e from '../src/library/equality-composition-more-2';
test('equality composition primitives are kernel checked', () => {
  check([], e.eqSymmProof, e.eqSymmType);
  check([], e.succCongrProof, e.succCongrType);
  check([], e.natTransConcreteProof, e.natTransConcreteType);
});
