import { Term, Type, variable, pi, lambda, prod, pair, fst, snd, eq, refl } from '../syntax/ast';

export const fstPairType: Term = pi(Type, pi(Type,
  pi(variable(1), pi(variable(2),
    eq(variable(3), fst(pair(variable(1), variable(0))), variable(1)), 'b'), 'a'), 'B'), 'A');
export const fstPairProof: Term = lambda(Type, lambda(Type,
  lambda(variable(1), lambda(variable(2),
    refl(variable(3), variable(1)), 'b'), 'a'), 'B'), 'A');

export const sndPairType: Term = pi(Type, pi(Type,
  pi(variable(1), pi(variable(2),
    eq(variable(3), snd(pair(variable(1), variable(0))), variable(0)), 'b'), 'a'), 'B'), 'A');
export const sndPairProof: Term = lambda(Type, lambda(Type,
  lambda(variable(1), lambda(variable(2),
  refl(variable(3), variable(0)), 'b'), 'a'), 'B'), 'A');

/** A nested pair projects back to its original components. */
export const nestedFstType: Term = pi(Type, pi(Type, pi(Type,
  pi(variable(1), pi(variable(2), pi(variable(3),
    eq(variable(4), fst(pair(variable(1), pair(variable(0), variable(2)))), variable(1)), 'c'), 'b'), 'a'), 'C'), 'B'), 'A');
export const nestedFstProof: Term = lambda(Type, lambda(Type, lambda(Type,
  lambda(variable(1), lambda(variable(2), lambda(variable(3),
    refl(variable(4), variable(1)), 'c'), 'b'), 'a'), 'C'), 'B'), 'A');

/** Product eta: every pair is reconstructed by its projections. */
