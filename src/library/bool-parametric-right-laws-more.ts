import { Term, Bool, True, False, variable, pi, lambda, boolRec, app, eq, refl } from '../syntax/ast';
import { boolAnd, boolOr } from './bool-ops';

/** Right-side absorbing and identity laws, proved by Boolean case analysis. */
export const andRightFalseType: Term = pi(Bool,
  eq(Bool, app(app(boolAnd, variable(0)), False), False), 'b');
export const andRightFalseProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolAnd, variable(0)), False), False)),
    refl(Bool, False), refl(Bool, False), variable(0)), 'b');

export const orRightTrueType: Term = pi(Bool,
  eq(Bool, app(app(boolOr, variable(0)), True), True), 'b');
export const orRightTrueProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolOr, variable(0)), True), True)),
    refl(Bool, True), refl(Bool, True), variable(0)), 'b');
