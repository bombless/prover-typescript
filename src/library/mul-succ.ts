import { Term, Nat, variable, pi, lambda, succ, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';
import { mulTerm } from './mul';

/** Multiplication unfolds on its first argument:
 *   (Succ n) * m = m + (n * m).
 * This is a definitional theorem for the current recursive definition. */
export const mulSuccType: Term = pi(Nat,
  pi(Nat,
    eq(Nat,
      mulTerm(succ(variable(1)), variable(0)),
      addTerm(variable(0), mulTerm(variable(1), variable(0)))),
    'm'),
  'n');

export const mulSuccProof: Term = lambda(Nat,
  lambda(Nat,
    refl(Nat, addTerm(variable(0), mulTerm(variable(1), variable(0)))),
    'm'),
  'n');

/** Multiplication by a double successor unfolds twice. */
export const mulSuccTwiceType: Term = pi(Nat, pi(Nat,
  eq(Nat, mulTerm(succ(succ(variable(1))), variable(0)),
    addTerm(variable(0), addTerm(variable(0), mulTerm(variable(1), variable(0))))), 'm'), 'n');
export const mulSuccTwiceProof: Term = lambda(Nat,
  lambda(Nat, refl(Nat, addTerm(variable(0), addTerm(variable(0), mulTerm(variable(1), variable(0))))), 'm'), 'n');

/** Multiplication by a triple successor unfolds three times. */
export const mulSuccTripleType: Term = pi(Nat, pi(Nat,
  eq(Nat, mulTerm(succ(succ(succ(variable(1)))), variable(0)),
    addTerm(variable(0), addTerm(variable(0), addTerm(variable(0), mulTerm(variable(1), variable(0)))))), 'm'), 'n');
export const mulSuccTripleProof: Term = lambda(Nat,
  lambda(Nat, refl(Nat, addTerm(variable(0), addTerm(variable(0), addTerm(variable(0), mulTerm(variable(1), variable(0)))))), 'm'), 'n');

/** Multiplication by a quadruple successor unfolds four times. */
export const mulSuccQuadType: Term = pi(Nat, pi(Nat,
  eq(Nat, mulTerm(succ(succ(succ(succ(variable(1))))), variable(0)),
    addTerm(variable(0), addTerm(variable(0), addTerm(variable(0), addTerm(variable(0), mulTerm(variable(1), variable(0))))))), 'm'), 'n');
export const mulSuccQuadProof: Term = lambda(Nat, lambda(Nat,
  refl(Nat, addTerm(variable(0), addTerm(variable(0), addTerm(variable(0), addTerm(variable(0), mulTerm(variable(1), variable(0))))))), 'm'), 'n');
