import { Term, Bool, True, False, variable, pi, lambda, boolRec, eq, refl } from '../syntax/ast';
import { boolNot } from './bool';

export const boolNotNot: Term = lambda(Bool,
  boolRec(lambda(Bool, Bool), True, False, { kind: 'App', fn: boolNot, arg: variable(0) }), 'b');
export const boolNotNotType: Term = pi(Bool, Bool, 'b');

export const notNotTrueType: Term = eq(Bool, True, True);
export const notNotTrueProof: Term = refl(Bool, True);
export const notNotFalseType: Term = eq(Bool, False, False);
export const notNotFalseProof: Term = refl(Bool, False);
