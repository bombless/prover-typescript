import { Term, Nat, variable, pi, lambda, eq, refl, eqRec } from '../syntax/ast';

/** Symmetry of equality on Nat, implemented with Eq.rec. */
export const natEqSymmType: Term = pi(Nat, pi(Nat,
  pi(eq(Nat, variable(1), variable(0)), eq(Nat, variable(1), variable(2)), 'h'), 'b'), 'a');

// In the equality proof context [h, b, a], transport the reflexive proof
// Eq a a along h : Eq a b to obtain Eq b a.
export const natEqSymmProof: Term = lambda(Nat,
  lambda(Nat,
    lambda(eq(Nat, variable(1), variable(0)),
      eqRec(
        lambda(Nat, eq(Nat, variable(0), variable(3))),
        refl(Nat, variable(2)),
        variable(2), variable(1), variable(0)
      ), 'h'), 'b'), 'a');

export const natEqSymmZeroType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const natEqSymmZeroProof: Term = refl(Nat, { kind: 'Zero' });
