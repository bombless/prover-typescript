import { Term, Nat, variable, pi, lambda, app, succ, natRec, eq, refl, eqRec } from '../syntax/ast';
import { addTerm } from './nat';

/** P(a) = (b : Nat) -> (c : Nat) -> Eq Nat (add (add a b) c) (add a (add b c)). */
export const addAssocMotive: Term = lambda(
  Nat,
  pi(
    Nat,
    pi(
      Nat,
      eq(
        Nat,
        addTerm(addTerm(variable(2), variable(1)), variable(0)),
        addTerm(variable(2), addTerm(variable(1), variable(0)))
      )
    )
  ),
  'a'
);

export const addAssocType: Term = pi(
  Nat,
  pi(
    Nat,
    pi(
      Nat,
      eq(
        Nat,
        addTerm(addTerm(variable(2), variable(1)), variable(0)),
        addTerm(variable(2), addTerm(variable(1), variable(0)))
      )
    )
  ),
  'a'
);

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

/**
 * In the successor case, ih is itself a function of b and c. Applying it
 * and then transporting through Succ gives the required successor equality.
 */
export const addAssocSuccessorCase: Term = lambda(
  Nat,
  lambda(
    app(addAssocMotive, variable(0)),
    lambda(
      Nat,
      lambda(
        Nat,
        app(
          app(
            app(
              succCongrProof,
              addTerm(addTerm(variable(3), variable(1)), variable(0))
            ),
            addTerm(variable(3), addTerm(variable(1), variable(0)))
          ),
          app(app(variable(2), variable(1)), variable(0))
        ),
        'c'
      ),
      'b'
    ),
    'ih'
  ),
  'a'
);

export const addAssocProof: Term = lambda(
  Nat,
  natRec(
    addAssocMotive,
    lambda(
      Nat,
      lambda(Nat, refl(Nat, addTerm(variable(1), variable(0))), 'c'),
      'b'
    ),
    addAssocSuccessorCase,
    variable(0)
  ),
  'a'
);
