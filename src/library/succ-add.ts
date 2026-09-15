import { Term, Nat, variable, pi, lambda, succ, app, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';

/** P(n,m) = Eq Nat (add (Succ n) m) (Succ (add n m)). */
export const succAddMotive: Term = lambda(
  Nat,
  lambda(
    Nat,
    eq(
      Nat,
      addTerm(succ(variable(1)), variable(0)),
      succ(addTerm(variable(1), variable(0)))
    ),
    'm'
  ),
  'n'
);

export const succAddType: Term = pi(
  Nat,
  pi(
    Nat,
    eq(
      Nat,
      addTerm(succ(variable(1)), variable(0)),
      succ(addTerm(variable(1), variable(0)))
    )
  ),
  'n'
);

/** add (Succ n) m reduces definitionally to Succ (add n m). */
export const succAddProof: Term = lambda(
  Nat,
  lambda(
    Nat,
    refl(Nat, succ(addTerm(variable(1), variable(0)))),
    'm'
  ),
  'n'
);
