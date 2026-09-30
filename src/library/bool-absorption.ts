import { Term, Bool, True, False, variable, pi, lambda, boolRec, eq, refl } from '../syntax/ast';

export const andSelf: Term = lambda(Bool, boolRec(lambda(Bool, Bool), True, False, variable(0)), 'b');
export const andSelfType: Term = pi(Bool, Bool, 'b');
export const orSelf: Term = lambda(Bool, boolRec(lambda(Bool, Bool), True, False, variable(0)), 'b');
export const orSelfType: Term = pi(Bool, Bool, 'b');
export const andTrueType: Term = eq(Bool, True, True);
export const andTrueProof: Term = refl(Bool, True);
export const orFalseType: Term = eq(Bool, False, False);
export const orFalseProof: Term = refl(Bool, False);
