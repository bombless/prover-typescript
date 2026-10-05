import { Term, Nat, Zero, eq, refl, app, succ } from '../syntax/ast';
import { numeral, addTerm } from './nat';
import { mulTerm } from './mul';
import { powTerm } from './pow';
import { sub } from './sub';

const subTerm = (a: Term, b: Term): Term => app(app(sub, a), b);

export const distributiveConcreteType: Term = eq(Nat,
  mulTerm(numeral(4), addTerm(numeral(3), numeral(2))), numeral(20));
export const distributiveConcreteProof: Term = refl(Nat, numeral(20));

export const mixedPowerConcreteType: Term = eq(Nat,
  addTerm(powTerm(numeral(2), numeral(4)), mulTerm(numeral(3), numeral(5))), numeral(31));
export const mixedPowerConcreteProof: Term = refl(Nat, numeral(31));

export const nestedSubConcreteType: Term = eq(Nat,
  subTerm(addTerm(numeral(17), numeral(8)), numeral(9)), numeral(16));
export const nestedSubConcreteProof: Term = refl(Nat, numeral(16));

export const successorArithmeticType: Term = eq(Nat,
  succ(addTerm(mulTerm(numeral(2), numeral(6)), numeral(3))), numeral(16));
export const successorArithmeticProof: Term = refl(Nat, numeral(16));
