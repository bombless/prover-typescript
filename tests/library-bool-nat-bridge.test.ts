import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { boolToNat, boolToNatType, trueToNatProof, trueToNatType, falseToNatProof, falseToNatType } from '../src/library/bool-nat-bridge';

test('Boolean-to-natural bridge is kernel checked', () => {
  check([], boolToNatType, { kind: 'Type' });
  check([], trueToNatProof, trueToNatType);
  check([], falseToNatProof, falseToNatType);
});
