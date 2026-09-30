import { Term, Bool, variable, pi, lambda, eq, refl } from '../syntax/ast';

/** Reflexivity family for Boolean values. */
export const boolReflType: Term = pi(Bool, eq(Bool, variable(0), variable(0)), 'b');
export const boolReflProof: Term = lambda(Bool, refl(Bool, variable(0)), 'b');
