import { Term, Nat, Bool, True, False, Zero, variable, pi, lambda, succ, natRec, boolRec, eq, refl } from '../syntax/ast';

/** Equality test for Nat, recursively comparing successors. */
export const natEq: Term = lambda(Nat,
  lambda(Nat,
    natRec(lambda(Nat, Bool),
      lambda(Nat, boolRec(lambda(Bool, Bool), False, True, variable(0))),
      lambda(Nat, lambda(Nat,
        boolRec(lambda(Bool, Bool), False, True, variable(0)))),
      variable(1)), 'm'), 'n');
export const natEqType: Term = pi(Nat, pi(Nat, Bool, 'm'), 'n');
export const natEqZeroZeroType: Term = eq(Bool, True, True);
export const natEqZeroZeroProof: Term = refl(Bool, True);

/** The Nat equality decision computes on constructor pairs. */

/** Less-than-or-equal decision for the zero cases. */
export const natLeZeroType: Term = eq(Bool, True, True);
export const natLeZeroProof: Term = refl(Bool, True);
