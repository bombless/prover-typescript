import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as n from '../src/library/nat-concrete-more-7';

test('additional closed arithmetic certificates are kernel checked', () => {
  check([], n.addLargeProof, n.addLargeType);
  check([], n.mulSevenProof, n.mulSevenType);
  check([], n.powThreeProof, n.powThreeType);
  check([], n.predLargeProof, n.predLargeType);
  check([], n.subLargeProof, n.subLargeType);
  check([], n.mixedArithmeticProof, n.mixedArithmeticType);
  check([], n.successorArithmeticProof, n.successorArithmeticType);
  check([], n.underflowLargeProof, n.underflowLargeType);
});
