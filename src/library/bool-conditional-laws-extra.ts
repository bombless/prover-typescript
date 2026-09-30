import { Term, Bool, True, False, variable, pi, lambda, boolRec, eq, refl } from '../syntax/ast';

/** Boolean recursion returns the true branch on true. */
export const boolIfTrueType: Term = pi(Bool, pi(Bool, eq(Bool,
  { kind: 'BoolRec', motive: lambda(Bool, Bool), trueCase: variable(1), falseCase: variable(0), scrutinee: True },
  variable(1)), 'f'), 't');
export const boolIfTrueProof: Term = lambda(Bool, lambda(Bool, refl(Bool, variable(1)), 'f'), 't');

/** Boolean recursion returns the false branch on false. */
export const boolIfFalseType: Term = pi(Bool, pi(Bool, eq(Bool,
  { kind: 'BoolRec', motive: lambda(Bool, Bool), trueCase: variable(1), falseCase: variable(0), scrutinee: False },
  variable(0)), 'f'), 't');
export const boolIfFalseProof: Term = lambda(Bool, lambda(Bool, refl(Bool, variable(0)), 'f'), 't');
