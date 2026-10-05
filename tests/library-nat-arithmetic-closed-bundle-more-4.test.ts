import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as a from '../src/library/nat-arithmetic-closed-bundle-more-4';
test('another closed arithmetic bundle is kernel checked', () => {
  check([], a.addTwentyThreeNineteenProof, a.addTwentyThreeNineteenType);
  check([], a.productSevenSevenProof, a.productSevenSevenType);
  check([], a.powTwoSixProof, a.powTwoSixType);
  check([], a.mixedSmallProof, a.mixedSmallType);
  check([], a.predAddProof, a.predAddType);
  check([], a.subProductProof, a.subProductType);
  check([], a.zeroSubAddProof, a.zeroSubAddType);
});
