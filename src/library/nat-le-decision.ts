import { Term, Nat, Bool, True, False, Zero, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { sub } from './sub';
import { isZero } from './nat-predicates';
import { numeral } from './nat';

/** Computable non-strict order: m ≤ n iff the truncated difference m - n is zero. */
export const natLeBool: Term = lambda(Nat,
  lambda(Nat, app(isZero, app(app(sub, variable(1)), variable(0))), 'n'), 'm');
export const natLeBoolType: Term = pi(Nat, pi(Nat, Bool, 'n'), 'm');

export const natLeTwoFiveType: Term = eq(Bool, app(app(natLeBool, numeral(2)), numeral(5)), True);
export const natLeTwoFiveProof: Term = refl(Bool, True);
export const natLeFiveTwoType: Term = eq(Bool, app(app(natLeBool, numeral(5)), numeral(2)), False);
export const natLeFiveTwoProof: Term = refl(Bool, False);
export const natLeZeroGeneralType: Term = pi(Nat,
  eq(Bool, app(app(natLeBool, Zero), variable(0)), True), 'n');
export const natLeZeroGeneralProof: Term = lambda(Nat, refl(Bool, True), 'n');
