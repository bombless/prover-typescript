import { Term, Nat, Zero, variable, pi, lambda, succ, app, eq, refl } from '../syntax/ast';
import { mulTerm } from './mul';
import { addTerm } from './nat';

/** Multiplication by zero on the left is definitionally zero. */
export const mulZeroLeftType: Term = pi(Nat, eq(Nat, mulTerm(Zero, variable(0)), Zero), 'n');
export const mulZeroLeftProof: Term = lambda(Nat, refl(Nat, Zero), 'n');

/** Multiplication by a triple successor unfolds three addends. */
export const mulTripleSuccessorLeftType: Term = pi(Nat, pi(Nat,
  eq(Nat, mulTerm(succ(succ(succ(variable(1)))), variable(0)),
    addTerm(variable(0), addTerm(variable(0), addTerm(variable(0), mulTerm(variable(1), variable(0)))))), 'm'), 'n');
export const mulTripleSuccessorLeftProof: Term = lambda(Nat, lambda(Nat,
  refl(Nat,
    addTerm(variable(0), addTerm(variable(0), addTerm(variable(0), mulTerm(variable(1), variable(0))))),
    ), 'm'), 'n');
