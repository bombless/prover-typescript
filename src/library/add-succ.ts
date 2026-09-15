import { Term, Nat, variable, pi, lambda, app, succ, natRec, eq, refl, eqRec } from '../syntax/ast';
import { addTerm } from './nat';

/** P(n) = (m : Nat) -> Eq Nat (add n (Succ m)) (Succ (add n m)). */
export const addSuccMotive: Term = lambda(
  Nat,
  pi(
    Nat,
    eq(
      Nat,
      addTerm(variable(1), succ(variable(0))),
      succ(addTerm(variable(1), variable(0)))
    )
  ),
  'n'
);

export const addSuccType: Term = pi(
  Nat,
  pi(
    Nat,
    eq(
      Nat,
      addTerm(variable(1), succ(variable(0))),
      succ(addTerm(variable(1), variable(0)))
    )
  ),
  'n'
);

/* Generic equality congruence for Succ, expressed only with Eq.rec. */
const succCongrMotive = lambda(
  Nat,
  eq(Nat, succ(variable(3)), succ(variable(0))),
  'x'
);

const succCongrProof: Term = lambda(
  Nat,
  lambda(
    Nat,
    lambda(
      eq(Nat, variable(1), variable(0)),
      eqRec(
        succCongrMotive,
        refl(Nat, succ(variable(2))),
        variable(2),
        variable(1),
        variable(0)
      ),
      'p'
    ),
    'b'
  ),
  'a'
);

/*
 * The induction hypothesis is a function of m. Applying it gives
 *
 *   ih m : Eq Nat (add n (Succ m)) (Succ (add n m)).
 *
 * Succ-congruence then gives the successor goal after definitional reduction
 * of add (Succ n) m and add (Succ n) (Succ m).
 */
const successorCaseProof = lambda(
  Nat,
  lambda(
    app(addSuccMotive, variable(0)),
    lambda(
      Nat,
      app(
        app(
          app(
            succCongrProof,
            addTerm(variable(2), succ(variable(0)))
          ),
          succ(addTerm(variable(2), variable(0)))
        ),
        app(variable(1), variable(0))
      ),
      'm'
    ),
    'ih'
  ),
  'n'
);

export const addSuccSuccessorCase: Term = successorCaseProof;

export const addSuccProof: Term = lambda(
  Nat,
  natRec(
    addSuccMotive,
    lambda(Nat, refl(Nat, succ(variable(0))), 'm'),
    addSuccSuccessorCase,
    variable(0)
  ),
  'n'
);
