import { Term, Type, Empty, variable, pi, lambda, emptyRec } from '../syntax/ast';

/** Polymorphic identity: (A : Type) -> A -> A. */
export const identityType: Term = pi(Type, pi(variable(0), variable(1), 'x'), 'A');
export const identityProof: Term = lambda(Type, lambda(variable(0), variable(0), 'x'), 'A');

/** K combinator: every proposition/type has a constant function. */
export const constantType: Term = pi(Type, pi(Type, pi(variable(1), pi(variable(2), variable(1), 'b'), 'a'), 'B'), 'A');
export const constantProof: Term = lambda(Type, lambda(Type, lambda(variable(1), lambda(variable(2), variable(1), 'b'), 'a'), 'B'), 'A');

/** Function application as a proof term: (A -> B) -> A -> B. */
export const applyType: Term = pi(Type, pi(Type, pi(pi(variable(1), variable(0), 'f'), pi(variable(1), variable(2), 'x')), 'B'), 'A');
export const applyProof: Term = lambda(Type, lambda(Type, lambda(pi(variable(1), variable(0), 'f'), lambda(variable(1), { kind: 'App', fn: variable(1), arg: variable(0) }, 'x'), 'f'), 'B'), 'A');

/** Contradiction elimination for an explicitly supplied empty type. */
export const absurdType: Term = pi(Type, pi(Empty, variable(1), 'h'), 'P');
export const absurdProof: Term = lambda(Type, lambda(Empty, emptyRec(lambda(Empty, variable(2)), variable(0)), 'h'), 'P');
