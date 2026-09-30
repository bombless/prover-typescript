import { Term, Bool, True, False, variable, pi, lambda, boolRec, eq, refl, app } from '../syntax/ast';
import { boolNot } from './bool';
import { boolAnd, boolOr } from './bool-ops';

/** Case splitting proves every Bool is either True or False at the result level. */
export const boolCaseTrueOrFalse: Term = lambda(Bool,
  boolRec(lambda(Bool, Bool), True, False, variable(0)), 'b');
export const boolCaseTrueOrFalseType: Term = pi(Bool, Bool, 'b');

/** Negation swaps the two Boolean branches. */
export const notCaseType: Term = pi(Bool,
  eq(Bool, app(boolNot, variable(0)),
    boolRec(lambda(Bool, Bool), False, True, variable(0))), 'b');
export const notCaseProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(boolNot, variable(0)), boolRec(lambda(Bool, Bool), False, True, variable(0)))),
    refl(Bool, False), refl(Bool, True), variable(0)), 'b');

/** Conjunction with True on the right is the identity, by cases. */
export const andRightTrueType: Term = pi(Bool,
  eq(Bool, app(app(boolAnd, variable(0)), True), variable(0)), 'b');
export const andRightTrueProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolAnd, variable(0)), True), variable(0))),
    refl(Bool, True), refl(Bool, False), variable(0)), 'b');

/** Disjunction with False on the right is the identity, by cases. */
export const orRightFalseType: Term = pi(Bool,
  eq(Bool, app(app(boolOr, variable(0)), False), variable(0)), 'b');
export const orRightFalseProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolOr, variable(0)), False), variable(0))),
    refl(Bool, True), refl(Bool, False), variable(0)), 'b');
