import { Term, Nat, Zero, variable, pi, lambda, app, succ, natRec, eq, refl, eqRec } from '../syntax/ast';
import { addTerm } from './nat';
import { addSuccProof } from './add-succ';
import { addZeroProof } from './add-zero';

/** P(a) = (b : Nat) -> Eq Nat (add a b) (add b a). */
export const addCommMotive: Term = lambda(
  Nat,
  pi(
    Nat,
    eq(
      Nat,
      addTerm(variable(1), variable(0)),
      addTerm(variable(0), variable(1))
    )
  ),
  'a'
);

export const addCommType: Term = pi(
  Nat,
  pi(
    Nat,
    eq(
      Nat,
      addTerm(variable(1), variable(0)),
      addTerm(variable(0), variable(1))
    )
  ),
  'a'
);

/** Generic equality congruence for Succ, expressed through Eq.rec. */
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

/** Base case: reverse add_zero using a direct Eq.rec transport. */
const zeroCaseProof: Term = lambda(
  Nat,
  eqRec(
    lambda(
      Nat,
      eq(Nat, variable(0), addTerm(variable(1), Zero)),
      'x'
    ),
    refl(Nat, addTerm(variable(0), Zero)),
    addTerm(variable(0), Zero),
    variable(0),
    app(addZeroProof, variable(0))
  ),
  'b'
);

/**
 * Successor case: use Succ-congruence on ih, then transport that equality
 * along the symmetry of add_succ to reach add b (Succ a).
 */
export const addCommSuccessorCase: Term = lambda(
  Nat,
  lambda(
    app(addCommMotive, variable(0)),
    lambda(
      Nat,
      eqRec(
        lambda(
          Nat,
          eq(
            Nat,
            succ(addTerm(variable(3), variable(1))),
            variable(0)
          ),
          'x'
        ),
        app(
          app(
            app(
              succCongrProof,
              addTerm(variable(2), variable(0))
            ),
            addTerm(variable(0), variable(2))
          ),
          app(variable(1), variable(0))
        ),
        succ(addTerm(variable(0), variable(2))),
        addTerm(variable(0), succ(variable(2))),
        eqRec(
          lambda(
            Nat,
            eq(Nat, variable(0), addTerm(variable(1), succ(variable(3)))),
            'x'
          ),
          refl(Nat, addTerm(variable(0), succ(variable(2)))),
          addTerm(variable(0), succ(variable(2))),
          succ(addTerm(variable(0), variable(2))),
          app(app(addSuccProof, variable(0)), variable(2))
        )
      ),
      'b'
    ),
    'ih'
  ),
  'a'
);

export const addCommProof: Term = lambda(
  Nat,
  natRec(
    addCommMotive,
    zeroCaseProof,
    addCommSuccessorCase,
    variable(0)
  ),
  'a'
);
