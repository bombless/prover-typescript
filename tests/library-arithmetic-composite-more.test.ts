import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { nestedLargeArithmeticProof, nestedLargeArithmeticType, mixedArithmeticProof, mixedArithmeticType, nestedSubArithmeticProof, nestedSubArithmeticType, powSubArithmeticProof, powSubArithmeticType, addMulPowProof, addMulPowType } from '../src/library/arithmetic-examples';
test('nested arithmetic composites are kernel checked', () => {
  check([], nestedLargeArithmeticProof, nestedLargeArithmeticType);
  check([], mixedArithmeticProof, mixedArithmeticType);
  check([], nestedSubArithmeticProof, nestedSubArithmeticType);
  check([], powSubArithmeticProof, powSubArithmeticType);
  check([], addMulPowProof, addMulPowType);
});
