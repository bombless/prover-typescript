import { Term, Nat, eq, refl } from '../syntax/ast';
import { powTerm } from './pow';
import { numeral } from './nat';

export const powThreeFourType: Term = eq(Nat, powTerm(numeral(3), numeral(4)), numeral(81));
export const powThreeFourProof: Term = refl(Nat, numeral(81));
export const powFourThreeType: Term = eq(Nat, powTerm(numeral(4), numeral(3)), numeral(64));
export const powFourThreeProof: Term = refl(Nat, numeral(64));
export const powFiveTwoType: Term = eq(Nat, powTerm(numeral(5), numeral(2)), numeral(25));
export const powFiveTwoProof: Term = refl(Nat, numeral(25));
export const powTwoSixType: Term = eq(Nat, powTerm(numeral(2), numeral(6)), numeral(64));
export const powTwoSixProof: Term = refl(Nat, numeral(64));
