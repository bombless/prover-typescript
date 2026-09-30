import { Term, Nat, Zero, Type, variable, pi, lambda, eq, refl } from '../syntax/ast';

/** A lightweight non-strict order predicate on Nat: m ≤ n is represented by
 * the existence of a difference, encoded as a function witness. */
export const Le: Term = pi(Nat, pi(Nat, Type));
export const le = (m: Term, n: Term): Term => ({ kind: 'App', fn: { kind: 'App', fn: Le, arg: m }, arg: n });
