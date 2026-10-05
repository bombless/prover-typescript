import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as a from '../src/library/nat-arithmetic-closed-bundle-more-2';
test('more closed arithmetic compositions are kernel checked', () => {
  check([], a.powFourThreeProof, a.powFourThreeType);
  check([], a.powTwoFiveProof, a.powTwoFiveType);
  check([], a.subTwelveFiveProof, a.subTwelveFiveType);
  check([], a.nestedArithmeticProof, a.nestedArithmeticType);
  check([], a.predPowSubProof, a.predPowSubType);
  check([], a.mixedPowerProof, a.mixedPowerType);
  check([], a.zeroSubPowerProof, a.zeroSubPowerType);
});
