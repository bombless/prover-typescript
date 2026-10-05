import { Term, Nat, Zero, succ, variable, pi, lambda, eq, refl } from '../syntax/ast';
import { powTerm } from './pow';
import { mulTerm } from './mul';
export const powZeroType: Term = pi(Nat, eq(Nat, powTerm(variable(0), Zero), succ(Zero)), 'n');
export const powZeroProof: Term = lambda(Nat, refl(Nat, succ(Zero)), 'n');
export const powSuccParametricType: Term = pi(Nat, pi(Nat, eq(Nat, powTerm(variable(1), succ(variable(0))), mulTerm(variable(1), powTerm(variable(1), variable(0)))), 'k'), 'n');
export const powSuccParametricProof: Term = lambda(Nat, lambda(Nat, refl(Nat, mulTerm(variable(1), powTerm(variable(1), variable(0)))), 'k'), 'n');
