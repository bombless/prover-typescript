import { Term, Empty, Type, variable, pi, lambda, emptyRec } from '../syntax/ast';

/** Empty elimination is polymorphic in the result type. */
export const emptyElimType: Term = pi(Type, pi(Empty, variable(1), 'e'), 'P');
export const emptyElimProof: Term = lambda(Type,
  lambda(Empty, emptyRec(lambda(Empty, variable(2)), variable(0)), 'e'), 'P');
