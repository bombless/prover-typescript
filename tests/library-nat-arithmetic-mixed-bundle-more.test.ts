import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/nat-arithmetic-mixed-bundle-more';

test('mixed multiplication and powers are kernel checked', () => {
  check([], c.mulSevenEightProof, c.mulSevenEightType);
  check([], c.mulNineNineProof, c.mulNineNineType);
  check([], c.powFourThreeProof, c.powFourThreeType);
});

test('nested subtraction and arithmetic are kernel checked', () => {
  check([], c.subTwentyThreeSevenProof, c.subTwentyThreeSevenType);
  check([], c.nestedMulPowProof, c.nestedMulPowType);
  check([], c.nestedSubMulPowProof, c.nestedSubMulPowType);
  check([], c.underflowCompositionProof, c.underflowCompositionType);
});
