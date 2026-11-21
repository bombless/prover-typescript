import { Term, Nat, Zero, variable, pi, lambda, succ, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';
import { mulTerm } from './mul';
import { powTerm } from './pow';

/* --------------------------------------------------------- 0 * n = 0 (rfl) */

export const zeroMulType: Term = pi(
  Nat,
  eq(Nat, mulTerm(Zero, variable(0)), Zero),
  'n'
);

export const zeroMulProof: Term = lambda(
  Nat,
  refl(Nat, Zero),
  'n'
);

/* ------------------------------------------- Succ n * m = m + n * m (rfl) */

export const succMulType: Term = pi(
  Nat,
  pi(Nat,
    eq(Nat, mulTerm(succ(variable(1)), variable(0)), addTerm(variable(0), mulTerm(variable(1), variable(0)))),
    'm'),
  'n'
);

export const succMulProof: Term = lambda(
  Nat,
  lambda(Nat,
    refl(Nat, mulTerm(succ(variable(1)), variable(0))),
    'm'),
  'n'
);

/* --------------------------------------------------------- n ^ 0 = 1 (rfl) */

export const powZeroType: Term = pi(
  Nat,
  eq(Nat, powTerm(variable(0), Zero), succ(Zero)),
  'n'
);

export const powZeroProof: Term = lambda(
  Nat,
  refl(Nat, succ(Zero)),
  'n'
);

/* ------------------------------------- n ^ Succ k = n * n ^ k (rfl) */

export const powSuccType: Term = pi(
  Nat,
  pi(Nat,
    eq(Nat, powTerm(variable(1), succ(variable(0))), mulTerm(variable(1), powTerm(variable(1), variable(0)))),
    'k'),
  'n'
);

export const powSuccProof: Term = lambda(
  Nat,
  lambda(Nat,
    refl(Nat, powTerm(variable(1), succ(variable(0)))),
    'k'),
  'n'
);
