import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { parityThreeProof, parityThreeType, parityFourProof, parityFourType, isZeroConcreteZeroProof, isZeroConcreteZeroType, isZeroConcreteThreeProof, isZeroConcreteThreeType } from '../src/library/nat-predicates';

test('additional parity and zero tests are kernel checked', () => {
  check([], parityThreeProof, parityThreeType);
  check([], parityFourProof, parityFourType);
  check([], isZeroConcreteZeroProof, isZeroConcreteZeroType);
  check([], isZeroConcreteThreeProof, isZeroConcreteThreeType);
});
