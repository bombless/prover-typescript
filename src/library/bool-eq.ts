import { Term, Bool, True, False, variable, pi, lambda, boolRec, eq, refl } from '../syntax/ast';
import { boolNot } from './bool';

/** Boolean equality test, defined by case analysis. */
export const boolEq: Term = lambda(Bool,
  lambda(Bool,
    boolRec(lambda(Bool, Bool),
      boolRec(lambda(Bool, Bool), True, False, variable(0)),
      boolRec(lambda(Bool, Bool), False, True, variable(0)),
      variable(1)), 'b'), 'a');
export const boolEqType: Term = pi(Bool, pi(Bool, Bool, 'b'), 'a');
export const trueEqTrueType: Term = eq(Bool, True, True);
export const trueEqTrueProof: Term = refl(Bool, True);
export const trueEqFalseType: Term = eq(Bool, False, False);
export const trueEqFalseProof: Term = refl(Bool, False);
