import { Term, Bool, True, False, variable, pi, lambda, boolRec, app, eq, refl } from '../syntax/ast';
import { boolNot } from './bool';
import { boolAnd, boolOr } from './bool-ops';

/** Double negation for every Boolean, by case analysis. */
export const notNotType: Term = pi(Bool,
  eq(Bool, app(boolNot, app(boolNot, variable(0))), variable(0)), 'b');
export const notNotProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(boolNot, app(boolNot, variable(0))), variable(0))),
    refl(Bool, True), refl(Bool, False), variable(0)), 'b');

/** De Morgan form for conjunction with a fixed Boolean branch. */
export const notAndTrueType: Term = pi(Bool,
  eq(Bool, app(boolNot, app(app(boolAnd, variable(0)), True)), app(boolNot, variable(0))), 'b');
export const notAndTrueProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(boolNot, app(app(boolAnd, variable(0)), True)), app(boolNot, variable(0)))),
    refl(Bool, False), refl(Bool, True), variable(0)), 'b');

/** De Morgan form for disjunction with a fixed Boolean branch. */
export const notOrFalseType: Term = pi(Bool,
  eq(Bool, app(boolNot, app(app(boolOr, variable(0)), False)), app(boolNot, variable(0))), 'b');
export const notOrFalseProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(boolNot, app(app(boolOr, variable(0)), False)), app(boolNot, variable(0)))),
    refl(Bool, False), refl(Bool, True), variable(0)), 'b');
