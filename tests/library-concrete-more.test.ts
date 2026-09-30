import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import {
  addEightSevenProof, addEightSevenType, mulThreeFiveProof, mulThreeFiveType,
  powThreeThreeProof, powThreeThreeType, predSixProof, predSixType,
  subNineFourProof, subNineFourType, notTrueConcreteProof, notTrueConcreteType,
  notFalseConcreteProof, notFalseConcreteType,
} from '../src/library/concrete-more';

test('additional closed arithmetic and Boolean computations are kernel checked', () => {
  check([], addEightSevenProof, addEightSevenType);
  check([], mulThreeFiveProof, mulThreeFiveType);
  check([], powThreeThreeProof, powThreeThreeType);
  check([], predSixProof, predSixType);
  check([], subNineFourProof, subNineFourType);
  check([], notTrueConcreteProof, notTrueConcreteType);
  check([], notFalseConcreteProof, notFalseConcreteType);
});
