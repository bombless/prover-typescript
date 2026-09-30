import { Term, Nat, Zero, variable, pi, lambda, eq, refl, succ } from '../syntax/ast';
import { powTerm } from './pow';

/** n^0 = 1 by the defining equation of exponentiation. */
export const powZeroType: Term = pi(Nat, eq(Nat, powTerm(variable(0), Zero), succ(Zero)), 'n');
export const powZeroProof: Term = lambda(Nat, refl(Nat, succ(Zero)), 'n');
