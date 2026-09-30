import { Term, Nat, variable, pi, lambda, succ, eq, refl } from '../syntax/ast';

export const succCongrType: Term = pi(Nat, pi(Nat, pi(eq(Nat, variable(1), variable(0)), eq(Nat, succ(variable(2)), succ(variable(1))), 'h'), 'b'), 'a');

export const succCongrProof: Term = lambda(Nat,
  lambda(Nat,
    lambda(eq(Nat, variable(1), variable(0)),
      { kind: 'EqRec',
        motive: lambda(Nat, eq(Nat, succ(variable(3)), succ(variable(0)))),
        reflCase: refl(Nat, succ(variable(2))),
        left: variable(2), right: variable(1), equality: variable(0) }, 'h'), 'b'), 'a');
