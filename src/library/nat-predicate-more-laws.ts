import { Term, Nat, Bool, True, False, Zero, succ, variable, pi, lambda, eq, refl, app } from '../syntax/ast';
import { isZero, parity } from './nat-predicates';

const n = variable(0);
const isZeroAt = (value: Term, result: Term): Term => eq(Bool, app(isZero, value), result);
const parityAt = (value: Term, result: Term): Term => eq(Bool, app(parity, value), result);

/** Additional constructor computation laws for the Boolean Nat predicates. */
export const isZeroSuccFiveType: Term = pi(Nat, isZeroAt(succ(succ(succ(succ(succ(n))))), False), 'n');
export const isZeroSuccFiveProof: Term = lambda(Nat, refl(Bool, False), 'n');
export const isZeroSuccSixType: Term = pi(Nat, isZeroAt(succ(succ(succ(succ(succ(succ(n)))))), False), 'n');
export const isZeroSuccSixProof: Term = lambda(Nat, refl(Bool, False), 'n');
export const parityFiveType: Term = parityAt(succ(succ(succ(succ(succ(Zero))))), False);
export const parityFiveProof: Term = refl(Bool, False);
export const paritySixType: Term = parityAt(succ(succ(succ(succ(succ(succ(Zero)))))), True);
export const paritySixProof: Term = refl(Bool, True);
export const paritySevenType: Term = parityAt(succ(succ(succ(succ(succ(succ(succ(Zero))))))), False);
export const paritySevenProof: Term = refl(Bool, False);
export const parityEightType: Term = parityAt(succ(succ(succ(succ(succ(succ(succ(succ(Zero)))))))), True);
export const parityEightProof: Term = refl(Bool, True);
