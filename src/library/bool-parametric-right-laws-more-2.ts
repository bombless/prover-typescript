import { Term, Bool, True, False, variable, pi, lambda, boolRec, app, eq, refl } from '../syntax/ast';
import { boolAnd, boolOr } from './bool-ops';
export const andRightTrueType: Term = pi(Bool, eq(Bool, app(app(boolAnd, variable(0)), True), variable(0)), 'b');
export const andRightTrueProof: Term = lambda(Bool, boolRec(lambda(Bool, eq(Bool, app(app(boolAnd, variable(0)), True), variable(0))), refl(Bool, True), refl(Bool, False), variable(0)), 'b');
export const orRightFalseType: Term = pi(Bool, eq(Bool, app(app(boolOr, variable(0)), False), variable(0)), 'b');
export const orRightFalseProof: Term = lambda(Bool, boolRec(lambda(Bool, eq(Bool, app(app(boolOr, variable(0)), False), variable(0))), refl(Bool, True), refl(Bool, False), variable(0)), 'b');
