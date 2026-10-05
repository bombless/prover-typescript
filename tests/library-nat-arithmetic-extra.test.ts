import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { distributiveConcreteProof, distributiveConcreteType, mixedPowerConcreteProof, mixedPowerConcreteType, nestedSubConcreteProof, nestedSubConcreteType, successorArithmeticProof, successorArithmeticType } from '../src/library/nat-arithmetic-extra';

test('additional closed arithmetic certificates are kernel checked', () => {
  check([], distributiveConcreteProof, distributiveConcreteType);
  check([], mixedPowerConcreteProof, mixedPowerConcreteType);
  check([], nestedSubConcreteProof, nestedSubConcreteType);
  check([], successorArithmeticProof, successorArithmeticType);
});
