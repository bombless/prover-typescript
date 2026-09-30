import { Term, Nat, variable, pi, lambda, succ, app, eq, refl } from '../syntax/ast';
import { mulTerm } from './mul';
import { addTerm } from './nat';

/** Multiplication by a successor factor unfolds one more addend. */
export const mulSuccessorLeftType: Term = pi(Nat, pi(Nat,
  eq(Nat, mulTerm(succ(variable(1)), variable(0)), addTerm(variable(0), mulTerm(variable(1), variable(0)))), 'm'), 'n');
export const mulSuccessorLeftProof: Term = lambda(Nat, lambda(Nat,
  refl(Nat, addTerm(variable(0), mulTerm(variable(1), variable(0)))), 'm'), 'n');

/** Multiplication by two successor factors unfolds two addends. */
export const mulDoubleSuccessorLeftType: Term = pi(Nat, pi(Nat,
  eq(Nat, mulTerm(succ(succ(variable(1))), variable(0)),
    addTerm(variable(0), addTerm(variable(0), mulTerm(variable(1), variable(0))))), 'm'), 'n');
export const mulDoubleSuccessorLeftProof: Term = lambda(Nat, lambda(Nat,
  refl(Nat, addTerm(variable(0), addTerm(variable(0), mulTerm(variable(1), variable(0))))), 'm'), 'n');
