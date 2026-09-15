import { Term, Nat, Zero, variable, pi, lambda, app, succ, natRec, eq, refl, eqRec } from '../syntax/ast';
import { addTerm } from './nat';

/** P(x) = Eq Nat (add x 0) x. */
export const addZeroMotive: Term = lambda(
  Nat,
  eq(Nat, addTerm(variable(0), Zero), variable(0)),
  'x'
);

export const addZeroType: Term = pi(
  Nat,
  eq(Nat, addTerm(variable(0), Zero), variable(0)),
  'n'
);

/**
 * Successor case:
 *
 *   n  : Nat
 *   ih : Eq Nat (add n 0) n
 *
 * The local transport motive is
 *   Q(x) = Eq Nat (Succ (add n 0)) (Succ x).
 *
 * Q(add n 0) is proved by Refl, then Eq.rec transports that proof along ih
 * to Q(n).  The result is definitionally the required P(Succ n), because
 * add (Succ n) 0 reduces to Succ (add n 0).
 */
const successorCaseMotive = lambda(
  Nat,
  eq(
    Nat,
    succ(addTerm(variable(2), Zero)),
    succ(variable(0))
  ),
  'x'
);

const successorCaseLeft = addTerm(variable(1), Zero);

const successorCaseProof = eqRec(
  successorCaseMotive,
  refl(Nat, succ(successorCaseLeft)),
  successorCaseLeft,
  variable(1),
  variable(0)
);

export const addZeroSuccessorCase: Term = lambda(
  Nat,
  lambda(app(addZeroMotive, variable(0)), successorCaseProof, 'ih'),
  'n'
);

export const addZeroProof: Term = lambda(
  Nat,
  natRec(
    addZeroMotive,
    refl(Nat, Zero),
    addZeroSuccessorCase,
    variable(0)
  ),
  'n'
);
