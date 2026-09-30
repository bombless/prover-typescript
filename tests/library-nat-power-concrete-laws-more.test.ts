import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { powThreeFourType, powThreeFourProof, powFourThreeType, powFourThreeProof, powFiveTwoType, powFiveTwoProof, powTwoSixType, powTwoSixProof } from '../src/library/nat-power-concrete-laws-more';

test('three to the fourth power', () => check([], powThreeFourProof, powThreeFourType));
test('four to the third power', () => check([], powFourThreeProof, powFourThreeType));
test('five to the second power', () => check([], powFiveTwoProof, powFiveTwoType));
test('two to the sixth power', () => check([], powTwoSixProof, powTwoSixType));
