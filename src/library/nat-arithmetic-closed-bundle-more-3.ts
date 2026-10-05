import { Term, Nat, Zero, app, eq, refl } from '../syntax/ast';
import { numeral, addTerm } from './nat';
import { mulTerm } from './mul';
import { powTerm } from './pow';
import { pred } from './pred';
import { sub } from './sub';

const eqNat = (a: Term, b: Term): Term => eq(Nat, a, b);
const subTerm = (a: Term, b: Term): Term => app(app(sub, a), b);
const proof = (n: number): Term => refl(Nat, numeral(n));

/** A further batch of closed arithmetic certificates. */
export const powThreeFourType = eqNat(powTerm(numeral(3), numeral(4)), numeral(81));
export const powThreeFourProof = proof(81);
export const powFiveTwoType = eqNat(powTerm(numeral(5), numeral(2)), numeral(25));
export const powFiveTwoProof = proof(25);
export const productNineEightType = eqNat(mulTerm(numeral(9), numeral(8)), numeral(72));
export const productNineEightProof = proof(72);
export const addLargeType = eqNat(addTerm(numeral(37), numeral(28)), numeral(65));
export const addLargeProof = proof(65);
export const nestedPowerArithmeticType = eqNat(addTerm(powTerm(numeral(2), numeral(5)), subTerm(numeral(12), numeral(5))), numeral(39));
export const nestedPowerArithmeticProof = proof(39);
export const predecessorProductType = eqNat(app(pred, mulTerm(numeral(7), numeral(6))), numeral(41));
export const predecessorProductProof = proof(41);
export const truncatedSubtractionType = eqNat(subTerm(numeral(4), addTerm(numeral(3), numeral(5))), Zero);
export const truncatedSubtractionProof = proof(0);
