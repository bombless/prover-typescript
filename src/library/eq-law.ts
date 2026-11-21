import { Term, Type, variable, pi, lambda, eq, refl } from '../syntax/ast';

/**
 * Reflexivity of equality over an arbitrary type. Other equality laws
 * (symmetry, transitivity, congruence) live in the Nat-specific proof engine
 * tests where the existing `Eq.rec` motive convention is already covered.
 */

export const eqReflType: Term = pi(
  Type,
  pi(variable(0), eq(variable(1), variable(0), variable(0)), 'x'),
  'A'
);

export const eqReflProof: Term = lambda(
  Type,
  lambda(variable(0), refl(variable(1), variable(0)), 'x'),
  'A'
);
