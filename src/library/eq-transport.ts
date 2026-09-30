import { Term, Nat, Type, variable, pi, lambda, eq, refl, eqRec } from '../syntax/ast';

/** Transport a proof of P(a) across an equality a = b. */
export const transportType: Term = pi(Nat,
  pi(Nat,
    pi(pi(Nat, Type),
      pi(eq(Nat, variable(2), variable(1)),
        pi({ kind: 'App', fn: variable(1), arg: variable(2) },
          { kind: 'App', fn: variable(2), arg: variable(1) }, 'p'), 'h'), 'P'), 'b'), 'a');

export const transportProof: Term = lambda(Nat,
  lambda(Nat,
    lambda(pi(Nat, Type),
      lambda(eq(Nat, variable(2), variable(1)),
        lambda({ kind: 'App', fn: variable(1), arg: variable(2) },
          eqRec(variable(3), variable(0), variable(2), variable(1), variable(1)), 'p'), 'h'), 'P'), 'b'), 'a');
