import { Term, Bool, True, False, variable, pi, lambda, boolRec, eq, refl } from '../syntax/ast';

export const boolNot: Term = lambda(Bool, boolRec(lambda(Bool, Bool), False, True, variable(0)), 'b');
export const boolNotType: Term = pi(Bool, Bool, 'b');
export const notTrueType: Term = eq(Bool, { kind: 'App', fn: boolNot, arg: True }, False);
export const notTrueProof: Term = refl(Bool, False);
export const notFalseType: Term = eq(Bool, { kind: 'App', fn: boolNot, arg: False }, True);
export const notFalseProof: Term = refl(Bool, True);
export const boolId: Term = lambda(Bool, boolRec(lambda(Bool, Bool), True, False, variable(0)), 'b');
export const boolIdType: Term = pi(Bool, Bool, 'b');

/** The Boolean identity function computes to its input for each constructor. */
export const boolIdTrueType: Term = eq(Bool, { kind: 'App', fn: boolId, arg: True }, True);
export const boolIdTrueProof: Term = refl(Bool, True);
export const boolIdFalseType: Term = eq(Bool, { kind: 'App', fn: boolId, arg: False }, False);
export const boolIdFalseProof: Term = refl(Bool, False);
export const notNotGeneralType: Term = pi(Bool,
  eq(Bool, { kind: 'App', fn: boolNot, arg: { kind: 'App', fn: boolNot, arg: variable(0) } }, variable(0)), 'b');
