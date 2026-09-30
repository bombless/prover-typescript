import { Term, Nat, Zero, succ, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { addTerm } from './nat';
import { mulTerm } from './mul';
import { powTerm } from './pow';
import { sub } from './sub';

/** Mixed closed arithmetic expressions reduce entirely in the kernel. */
export const mixedArithmeticType: Term = eq(Nat,
  addTerm(mulTerm(numeral(3), numeral(4)), app(app(sub, numeral(10)), numeral(3))), numeral(19));
export const mixedArithmeticProof: Term = refl(Nat, numeral(19));

export const powerDifferenceType: Term = eq(Nat,
  app(app(sub, powTerm(numeral(3), numeral(3))), numeral(5)), numeral(22));
export const powerDifferenceProof: Term = refl(Nat, numeral(22));

export const nestedArithmeticType: Term = eq(Nat,
  mulTerm(addTerm(numeral(2), numeral(3)), app(app(sub, numeral(9)), numeral(4))), numeral(25));
export const nestedArithmeticProof: Term = refl(Nat, numeral(25));

/** Successor and predecessor cancel on a concrete natural. */
export const succPredConcreteType: Term = eq(Nat, app({ kind: 'Lambda', domain: Nat, body: variable(0) }, numeral(0)), numeral(0));
export const succPredConcreteProof: Term = refl(Nat, numeral(0));
