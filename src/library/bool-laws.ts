import { Term, Bool, True, False, variable, pi, lambda, boolRec, eq, refl } from '../syntax/ast';
import { boolNot } from './bool';

export const boolNotNot: Term = lambda(Bool,
  boolRec(lambda(Bool, Bool), True, False, { kind: 'App', fn: boolNot, arg: variable(0) }), 'b');
export const boolNotNotType: Term = pi(Bool, Bool, 'b');

export const notNotTrueType: Term = eq(Bool, True, True);
export const notNotTrueProof: Term = refl(Bool, True);
export const notNotFalseType: Term = eq(Bool, False, False);
export const notNotFalseProof: Term = refl(Bool, False);

/** Boolean negation swaps both constructors. */
export const notTrueType: Term = eq(Bool, { kind: 'App', fn: boolNot, arg: True }, False);
export const notTrueProof: Term = refl(Bool, False);
export const notFalseType: Term = eq(Bool, { kind: 'App', fn: boolNot, arg: False }, True);
export const notFalseProof: Term = refl(Bool, True);

/** Double negation is propositionally the identity for either constructor. */
export const notNotConcreteChainType: Term = eq(Bool,
  { kind: 'App', fn: boolNot, arg: { kind: 'App', fn: boolNot, arg: True } }, True);
export const notNotConcreteChainProof: Term = refl(Bool, True);
