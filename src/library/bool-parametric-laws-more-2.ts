import { Term, Bool, True, False, variable, pi, lambda, boolRec, app, eq, refl } from '../syntax/ast';
import { boolAnd, boolOr } from './bool-ops';
import { boolNot } from './bool';

/** Idempotence of conjunction. */
export const andIdempotentType: Term = pi(Bool,
  eq(Bool, app(app(boolAnd, variable(0)), variable(0)), variable(0)), 'b');
export const andIdempotentProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolAnd, variable(0)), variable(0)), variable(0))),
    refl(Bool, True), refl(Bool, False), variable(0)), 'b');

/** Idempotence of disjunction. */
export const orIdempotentType: Term = pi(Bool,
  eq(Bool, app(app(boolOr, variable(0)), variable(0)), variable(0)), 'b');
export const orIdempotentProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolOr, variable(0)), variable(0)), variable(0))),
    refl(Bool, True), refl(Bool, False), variable(0)), 'b');

/** Negation of conjunction with itself is negation. */
export const notAndSelfType: Term = pi(Bool,
  eq(Bool, app(boolNot, app(app(boolAnd, variable(0)), variable(0))), app(boolNot, variable(0))), 'b');
export const notAndSelfProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(boolNot, app(app(boolAnd, variable(0)), variable(0))), app(boolNot, variable(0)))),
    refl(Bool, False), refl(Bool, True), variable(0)), 'b');
