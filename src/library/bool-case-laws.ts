import { Term, Bool, True, False, Type, variable, pi, lambda, boolRec, eq, refl } from '../syntax/ast';

/** Every Boolean is equal to the result of a Boolean case split returning its input. */
export const boolCaseIdentityType: Term = pi(Bool,
  eq(Bool,
    { kind: 'BoolRec', motive: lambda(Bool, Bool), trueCase: True, falseCase: False, scrutinee: variable(0) },
    variable(0)), 'b');

export const boolCaseIdentityProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool,
    { kind: 'BoolRec', motive: lambda(Bool, Bool), trueCase: True, falseCase: False, scrutinee: variable(0) },
    variable(0))), refl(Bool, True), refl(Bool, False), variable(0)), 'b');
