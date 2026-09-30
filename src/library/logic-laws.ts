import { Term, Type, variable, pi, lambda, app } from '../syntax/ast';

/** A -> (B -> A). */
export const andIntroLeftType: Term = pi(Type, pi(Type, pi(variable(1), pi(variable(2), variable(1), 'b'), 'a'), 'B'), 'A');
export const andIntroLeftProof: Term = lambda(Type, lambda(Type, lambda(variable(1), lambda(variable(2), variable(1), 'b'), 'a'), 'B'), 'A');

/** Composition: (B -> C) -> (A -> B) -> A -> C. */
export const composeType: Term = pi(Type, pi(Type, pi(Type,
  pi(pi(variable(1), variable(0), 'g'),
    pi(pi(variable(2), variable(1), 'f'), pi(variable(3), variable(2), 'x'), 'f'), 'g'), 'C'), 'B'), 'A');

export const composeProof: Term = lambda(Type,
  lambda(Type,
    lambda(Type,
      lambda(pi(variable(1), variable(0), 'g'),
        lambda(pi(variable(2), variable(1), 'f'),
          lambda(variable(2),
            app(variable(3), app(variable(1), variable(0))), 'x'), 'f'), 'g'), 'C'), 'B'), 'A');
