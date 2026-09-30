import { Term, Nat, Zero, variable, pi, lambda, app, succ, eq, refl } from '../syntax/ast';
import { mulTerm } from './mul';
import { addTerm } from './nat';
import { numeral } from './nat';

/** Multiplication by zero on the right is definitionally zero. */
export const mulRightZeroType: Term = pi(Nat, eq(Nat, mulTerm(Zero, variable(0)), Zero), 'n');
export const mulRightZeroProof: Term = lambda(Nat, refl(Nat, Zero), 'n');

/** Multiplication by two computes as a doubled numeral for closed inputs. */
export const mulTwoConcreteType: Term = eq(Nat, mulTerm(numeral(2), numeral(7)), numeral(14));
export const mulTwoConcreteProof: Term = refl(Nat, numeral(14));

/** Multiplication successor in the second coordinate for a fixed left factor. */
export const mulTwoSuccType: Term = pi(Nat,
  eq(Nat, mulTerm(numeral(2), succ(variable(0))),
    mulTerm(numeral(2), succ(variable(0)))), 'n');
export const mulTwoSuccProof: Term = lambda(Nat,
  refl(Nat, mulTerm(numeral(2), succ(variable(0)))), 'n');
