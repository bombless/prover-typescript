import { Term, Nat, Zero, app, eq, refl } from '../syntax/ast';
import { numeral, addTerm } from './nat';
import { mulTerm } from './mul';
import { powTerm } from './pow';
import { pred } from './pred';
import { sub } from './sub';

const eqNat = (a: Term, b: Term): Term => eq(Nat, a, b);
const subTerm = (a: Term, b: Term): Term => app(app(sub, a), b);
const proof = (n: number): Term => refl(Nat, numeral(n));

/** More closed arithmetic compositions checked by the Kernel. */
export const powFourThreeType = eqNat(powTerm(numeral(4), numeral(3)), numeral(64));
export const powFourThreeProof = proof(64);
export const powTwoFiveType = eqNat(powTerm(numeral(2), numeral(5)), numeral(32));
export const powTwoFiveProof = proof(32);
export const subTwelveFiveType = eqNat(subTerm(numeral(12), numeral(5)), numeral(7));
export const subTwelveFiveProof = proof(7);
export const nestedArithmeticType = eqNat(addTerm(mulTerm(numeral(6), numeral(7)), subTerm(numeral(10), numeral(4))), numeral(48));
export const nestedArithmeticProof = proof(48);
export const predPowSubType = eqNat(app(pred, subTerm(powTerm(numeral(2), numeral(6)), numeral(9))), numeral(54));
export const predPowSubProof = proof(54);
export const mixedPowerType = eqNat(addTerm(powTerm(numeral(3), numeral(3)), mulTerm(numeral(2), numeral(4))), numeral(35));
export const mixedPowerProof = proof(35);
export const zeroSubPowerType = eqNat(subTerm(Zero, powTerm(numeral(5), numeral(2))), Zero);
export const zeroSubPowerProof = proof(0);
