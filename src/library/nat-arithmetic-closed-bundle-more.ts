import { Term, Nat, Zero, app, eq, refl } from '../syntax/ast';
import { numeral, addTerm } from './nat';
import { mulTerm } from './mul';
import { powTerm } from './pow';
import { pred } from './pred';
import { sub } from './sub';

const subTerm = (a: Term, b: Term): Term => app(app(sub, a), b);
const predTerm = (a: Term): Term => app(pred, a);
const eqNat = (a: Term, b: Term): Term => eq(Nat, a, b);
const proof = (n: number): Term => refl(Nat, numeral(n));

/** Additional closed computation certificates used as building blocks. */
export const powTwoThreeType = eqNat(powTerm(numeral(2), numeral(3)), numeral(8));
export const powTwoThreeProof = proof(8);
export const powThreeTwoType = eqNat(powTerm(numeral(3), numeral(2)), numeral(9));
export const powThreeTwoProof = proof(9);
export const powFiveZeroType = eqNat(powTerm(numeral(5), Zero), numeral(1));
export const powFiveZeroProof = proof(1);

export const subSevenThreeType = eqNat(subTerm(numeral(7), numeral(3)), numeral(4));
export const subSevenThreeProof = proof(4);
export const subThreeSevenType = eqNat(subTerm(numeral(3), numeral(7)), Zero);
export const subThreeSevenProof = proof(0);
export const predEightType = eqNat(predTerm(numeral(8)), numeral(7));
export const predEightProof = proof(7);

export const nestedPowSubType = eqNat(
  subTerm(addTerm(powTerm(numeral(2), numeral(4)), numeral(3)), numeral(5)),
  numeral(14),
);
export const nestedPowSubProof = proof(14);

export const nestedPredSubPowType = eqNat(
  predTerm(subTerm(powTerm(numeral(3), numeral(3)), numeral(2))),
  numeral(24),
);
export const nestedPredSubPowProof = proof(24);

export const mixedAddMulSubType = eqNat(
  addTerm(subTerm(mulTerm(numeral(4), numeral(5)), numeral(6)), numeral(2)),
  numeral(16),
);
export const mixedAddMulSubProof = proof(16);
