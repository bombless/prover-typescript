import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { concreteAndChainProof, concreteAndChainType, concreteOrChainProof, concreteOrChainType } from '../src/library/bool-ops';
test('composed Boolean operations are kernel checked', () => {
  check([], concreteAndChainProof, concreteAndChainType);
  check([], concreteOrChainProof, concreteOrChainType);
});
