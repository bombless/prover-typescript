import { Term, Nat, variable, pi, lambda, succ, eq, refl } from '../syntax/ast';
import { mulTerm } from './mul';
import { powTerm } from './pow';

/** Exponentiation unfolds on its second argument:
 *   n^(Succ k) = n * (n^k).
 */
export const powSuccType: Term = pi(Nat,
  pi(Nat,
    eq(Nat,
      powTerm(variable(1), succ(variable(0))),
      mulTerm(variable(1), powTerm(variable(1), variable(0)))),
    'k'),
  'n');

export const powSuccProof: Term = lambda(Nat,
  lambda(Nat,
    refl(Nat, mulTerm(variable(1), powTerm(variable(1), variable(0)))),
    'k'),
  'n');

/** Exponentiation at a double successor unfolds twice. */
export const powSuccTwiceType: Term = pi(Nat, pi(Nat,
  eq(Nat, powTerm(variable(1), succ(succ(variable(0)))),
    mulTerm(variable(1), mulTerm(variable(1), powTerm(variable(1), variable(0))))), 'k'), 'n');
export const powSuccTwiceProof: Term = lambda(Nat,
  lambda(Nat, refl(Nat, mulTerm(variable(1), mulTerm(variable(1), powTerm(variable(1), variable(0))))), 'k'), 'n');

/** Exponentiation at a triple successor unfolds three times. */
export const powSuccTripleType: Term = pi(Nat, pi(Nat,
  eq(Nat, powTerm(variable(1), succ(succ(succ(variable(0))))),
    mulTerm(variable(1),
      mulTerm(variable(1),
        mulTerm(variable(1), powTerm(variable(1), variable(0))))),
    ), 'k'), 'n');
export const powSuccTripleProof: Term = lambda(Nat,
  lambda(Nat, refl(Nat, mulTerm(variable(1), mulTerm(variable(1), mulTerm(variable(1), powTerm(variable(1), variable(0)))))), 'k'), 'n');

/** Exponentiation at a quadruple successor unfolds four times. */
export const powSuccQuadType: Term = pi(Nat, pi(Nat,
  eq(Nat, powTerm(variable(1), succ(succ(succ(succ(variable(0)))))),
    mulTerm(variable(1), mulTerm(variable(1), mulTerm(variable(1), mulTerm(variable(1), powTerm(variable(1), variable(0))))))), 'k'), 'n');
export const powSuccQuadProof: Term = lambda(Nat, lambda(Nat,
  refl(Nat, mulTerm(variable(1), mulTerm(variable(1), mulTerm(variable(1), mulTerm(variable(1), powTerm(variable(1), variable(0))))))), 'k'), 'n');
