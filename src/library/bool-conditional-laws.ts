import { Term, Bool, True, False, variable, pi, lambda, boolRec, eq, refl } from '../syntax/ast';
import { boolAnd, boolOr } from './bool-ops';

export const andTrueRight: Term = lambda(Bool,
  boolRec(lambda(Bool, Bool), variable(0), False, variable(0)), 'b');
export const andTrueRightType: Term = pi(Bool, Bool, 'b');
export const andTrueTrueType: Term = eq(Bool, True, True);
export const andTrueTrueProof: Term = refl(Bool, True);

export const orFalseRight: Term = lambda(Bool,
  boolRec(lambda(Bool, Bool), True, variable(0), variable(0)), 'b');
export const orFalseRightType: Term = pi(Bool, Bool, 'b');
export const orFalseFalseType: Term = eq(Bool, False, False);
export const orFalseFalseProof: Term = refl(Bool, False);
