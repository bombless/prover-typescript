import { Term, Bool, True, False, Type, variable, pi, lambda, boolRec, app, eq, refl } from '../syntax/ast';

/** Boolean conditional with a dependent result type. */
export const ifThenElse: Term = lambda(Bool, lambda(Type, lambda(variable(0), lambda(variable(1), variable(1), 'else'), 'then'), 'P'), 'b');

export const ifThenElseType: Term = pi(Bool, pi(Type, pi(variable(0), pi(variable(1), variable(2), 'else'), 'then'), 'P'), 'b');

export const ifTrueType: Term = eq(Bool, True, True);
export const ifTrueProof: Term = refl(Bool, True);
export const ifFalseType: Term = eq(Bool, False, False);
export const ifFalseProof: Term = refl(Bool, False);
