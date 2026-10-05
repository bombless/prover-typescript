import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as b from '../src/library/bool-parametric-laws-more-3';
test('parametric Boolean absorption laws are kernel checked', () => {
  check([], b.andOrAbsorptionProof, b.andOrAbsorptionType);
  check([], b.orAndAbsorptionProof, b.orAndAbsorptionType);
});
