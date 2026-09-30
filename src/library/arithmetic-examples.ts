import { Term, Nat, Zero, succ, eq, refl } from '../syntax/ast';
import { addTerm, numeral } from './nat';
import { mulTerm } from './mul';
import { powTerm } from './pow';
import { sub } from './sub';
import { app } from '../syntax/ast';
const subTerm = (a: Term, b: Term): Term => app(app(sub, a), b);

const eqNat = (left: Term, right: Term): Term => eq(Nat, left, right);

/** Closed computations are useful as small certificates and regression cases. */
export const addSevenFiveType = eqNat(addTerm(numeral(7), numeral(5)), numeral(12));
export const addSevenFiveProof: Term = refl(Nat, numeral(12));
export const mulFourSixType = eqNat(mulTerm(numeral(4), numeral(6)), numeral(24));
export const mulFourSixProof: Term = refl(Nat, numeral(24));
export const powTwoFiveType = eqNat(powTerm(numeral(2), numeral(5)), numeral(32));
export const powTwoFiveProof: Term = refl(Nat, numeral(32));
export const nestedArithmeticType = eqNat(
  addTerm(mulTerm(numeral(3), numeral(4)), powTerm(numeral(2), numeral(3))),
  numeral(20),
);
export const nestedArithmeticProof: Term = refl(Nat, numeral(20));

/** Successor is definitionally injective for closed values. */
export const successorConcreteType = eqNat(succ(numeral(9)), numeral(10));
export const successorConcreteProof: Term = refl(Nat, numeral(10));

export const addConcreteCommType = eqNat(addTerm(numeral(2), numeral(3)), addTerm(numeral(3), numeral(2)));
export const addConcreteCommProof: Term = refl(Nat, numeral(5));
export const mulConcreteCommType = eqNat(mulTerm(numeral(2), numeral(3)), mulTerm(numeral(3), numeral(2)));
export const mulConcreteCommProof: Term = refl(Nat, numeral(6));
export const zeroAddConcreteType = eqNat(addTerm(numeral(0), numeral(11)), numeral(11));
export const zeroAddConcreteProof: Term = refl(Nat, numeral(11));
export const mulByZeroConcreteType = eqNat(mulTerm(numeral(11), numeral(0)), numeral(0));
export const mulByZeroConcreteProof: Term = refl(Nat, numeral(0));
export const powOneConcreteType = eqNat(powTerm(numeral(7), numeral(1)), numeral(7));
export const powOneConcreteProof: Term = refl(Nat, numeral(7));

export const nestedLargeArithmeticType = eqNat(
  addTerm(mulTerm(numeral(4), numeral(5)), powTerm(numeral(2), numeral(4))),
  numeral(36));
export const nestedLargeArithmeticProof: Term = refl(Nat, numeral(36));
export const mixedArithmeticType = eqNat(
  mulTerm(addTerm(numeral(2), numeral(3)), numeral(4)), numeral(20));
export const mixedArithmeticProof: Term = refl(Nat, numeral(20));
export const nestedSubArithmeticType = eqNat(
  subTerm(addTerm(numeral(7), numeral(5)), numeral(4)), numeral(8));
export const nestedSubArithmeticProof: Term = refl(Nat, numeral(8));
export const powSubArithmeticType = eqNat(
  subTerm(powTerm(numeral(2), numeral(5)), numeral(7)), numeral(25));
export const powSubArithmeticProof: Term = refl(Nat, numeral(25));
export const addMulPowType = eqNat(
  addTerm(numeral(3), mulTerm(numeral(2), powTerm(numeral(2), numeral(3)))), numeral(19));
export const addMulPowProof: Term = refl(Nat, numeral(19));
