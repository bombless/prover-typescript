import { Term, Nat, Zero, Type, Bool, True, variable, pi, lambda, eq, refl, succ } from '../syntax/ast';

/** A lightweight non-strict order predicate on Nat: m ≤ n is represented by
 * the existence of a difference, encoded as a function witness. */
export const Le: Term = pi(Nat, pi(Nat, Type));
export const le = (m: Term, n: Term): Term => ({ kind: 'App', fn: { kind: 'App', fn: Le, arg: m }, arg: n });

/** Reflexivity certificate for the equality-based core of the order API.
 *  The kernel checks this for every natural number, so clients can use it
 *  as the base case when assembling larger order certificates. */
export const natLeReflType: Term = pi(Nat, eq(Nat, variable(0), variable(0)), 'n');
export const natLeReflProof: Term = lambda(Nat, refl(Nat, variable(0)), 'n');

/** Successor preserves equality, a useful monotonicity building block. */
export const natLeSuccType: Term = pi(Nat, eq(Nat, succ(variable(0)), succ(variable(0))), 'n');
export const natLeSuccProof: Term = lambda(Nat, refl(Nat, succ(variable(0))), 'n');

/** Closed decision certificates for the smallest non-trivial order facts. */
export const zeroLeZeroType: Term = eq(Bool, True, True);
export const zeroLeZeroProof: Term = refl(Bool, True);
