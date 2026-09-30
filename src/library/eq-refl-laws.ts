import { Term, Nat, variable, pi, lambda, eq, refl } from '../syntax/ast';

/** Reflexivity is available for every natural number. */
export const natReflType: Term = pi(Nat, eq(Nat, variable(0), variable(0)), 'n');
export const natReflProof: Term = lambda(Nat, refl(Nat, variable(0)), 'n');
