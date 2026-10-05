import { Term, Bool, True, False, variable, pi, lambda, boolRec, app, eq, refl } from '../syntax/ast';
import { boolXor } from './bool-xor';
import { boolNot } from './bool';

/** XOR with False on the right returns its left input. */
export const xorRightFalseParametricType: Term = pi(Bool,
  eq(Bool, app(app(boolXor, variable(0)), False), variable(0)), 'b');
export const xorRightFalseParametricProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolXor, variable(0)), False), variable(0))),
    refl(Bool, True), refl(Bool, False), variable(0)), 'b');

/** XOR with True on the right is negation. */
export const xorRightTrueParametricType: Term = pi(Bool,
  eq(Bool, app(app(boolXor, variable(0)), True), app(boolNot, variable(0))), 'b');
export const xorRightTrueParametricProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolXor, variable(0)), True), app(boolNot, variable(0)))),
    refl(Bool, False), refl(Bool, True), variable(0)), 'b');
