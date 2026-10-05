import { Term, Bool, True, False, variable, pi, lambda, boolRec, app, eq, refl } from '../syntax/ast';
import { boolAnd, boolOr } from './bool-ops';

/** Absorption: b ∧ (b ∨ True) = b. */
export const andOrAbsorptionType: Term = pi(Bool,
  eq(Bool, app(app(boolAnd, variable(0)), app(app(boolOr, variable(0)), True)), variable(0)), 'b');
export const andOrAbsorptionProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolAnd, variable(0)), app(app(boolOr, variable(0)), True)), variable(0))),
    refl(Bool, True), refl(Bool, False), variable(0)), 'b');

/** Absorption: b ∨ (b ∧ False) = b. */
export const orAndAbsorptionType: Term = pi(Bool,
  eq(Bool, app(app(boolOr, variable(0)), app(app(boolAnd, variable(0)), False)), variable(0)), 'b');
export const orAndAbsorptionProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolOr, variable(0)), app(app(boolAnd, variable(0)), False)), variable(0))),
    refl(Bool, True), refl(Bool, False), variable(0)), 'b');
