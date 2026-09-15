import { Term, Nat, Zero, variable, pi, lambda, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';

/** P(n) = Eq Nat (add 0 n) n. */
export const zeroAddMotive: Term = lambda(
  Nat,
  eq(Nat, addTerm(Zero, variable(0)), variable(0)),
  'n'
);

export const zeroAddType: Term = pi(
  Nat,
  eq(Nat, addTerm(Zero, variable(0)), variable(0)),
  'n'
);

/** add 0 n reduces definitionally to n, so reflexivity is sufficient. */
export const zeroAddProof: Term = lambda(
  Nat,
  refl(Nat, variable(0)),
  'n'
);
