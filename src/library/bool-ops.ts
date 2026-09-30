import { Term, Bool, True, False, variable, pi, lambda, boolRec, app, eq, refl } from '../syntax/ast';

export const boolAnd: Term = lambda(Bool,
  lambda(Bool, boolRec(lambda(Bool, Bool), variable(0), False, variable(1)), 'b'), 'a');
export const boolAndType: Term = pi(Bool, pi(Bool, Bool, 'b'), 'a');
export const trueAndTrueType: Term = eq(Bool, True, True);
export const trueAndTrueProof: Term = refl(Bool, True);
export const falseAndTrueType: Term = eq(Bool, False, False);
export const falseAndTrueProof: Term = refl(Bool, False);
export const trueAndFalseType: Term = eq(Bool, app(app(boolAnd, True), False), False);
export const trueAndFalseProof: Term = refl(Bool, False);

export const boolOr: Term = lambda(Bool,
  lambda(Bool, boolRec(lambda(Bool, Bool), True, variable(0), variable(1)), 'b'), 'a');
export const boolOrType: Term = pi(Bool, pi(Bool, Bool, 'b'), 'a');
export const falseOrFalseType: Term = eq(Bool, False, False);
export const falseOrFalseProof: Term = refl(Bool, False);
export const trueOrFalseType: Term = eq(Bool, True, True);
export const trueOrFalseProof: Term = refl(Bool, True);
export const falseOrTrueType: Term = eq(Bool, app(app(boolOr, False), True), True);
export const falseOrTrueProof: Term = refl(Bool, True);
export const falseAndFalseType: Term = eq(Bool, app(app(boolAnd, False), False), False);
export const falseAndFalseProof: Term = refl(Bool, False);
export const trueOrTrueType: Term = eq(Bool, app(app(boolOr, True), True), True);
export const trueOrTrueProof: Term = refl(Bool, True);

/** True is the left identity for Boolean conjunction. */
export const trueAndType: Term = pi(Bool, eq(Bool, app(app(boolAnd, True), variable(0)), variable(0)), 'b');
export const trueAndProof: Term = lambda(Bool, refl(Bool, variable(0)), 'b');

/** False is the left zero for Boolean conjunction. */
export const falseAndType: Term = pi(Bool, eq(Bool, app(app(boolAnd, False), variable(0)), False), 'b');
export const falseAndProof: Term = lambda(Bool, refl(Bool, False), 'b');

/** False is the left identity for Boolean disjunction. */
export const falseOrType: Term = pi(Bool, eq(Bool, app(app(boolOr, False), variable(0)), variable(0)), 'b');
export const falseOrProof: Term = lambda(Bool, refl(Bool, variable(0)), 'b');

/** True is the left zero for Boolean disjunction. */
export const trueOrType: Term = pi(Bool, eq(Bool, app(app(boolOr, True), variable(0)), True), 'b');
export const trueOrProof: Term = lambda(Bool, refl(Bool, True), 'b');

/** Right identity for conjunction, proved by Boolean case analysis. */
export const andRightTrueType: Term = pi(Bool,
  eq(Bool, app(app(boolAnd, variable(0)), True), variable(0)), 'b');
export const andRightTrueProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolAnd, variable(0)), True), variable(0))),
    refl(Bool, True), refl(Bool, False), variable(0)), 'b');

/** Right identity for disjunction, proved by Boolean case analysis. */
export const orRightFalseType: Term = pi(Bool,
  eq(Bool, app(app(boolOr, variable(0)), False), variable(0)), 'b');
export const orRightFalseProof: Term = lambda(Bool,
  boolRec(lambda(Bool, eq(Bool, app(app(boolOr, variable(0)), False), variable(0))),
    refl(Bool, True), refl(Bool, False), variable(0)), 'b');
export const concreteAndChainType: Term = eq(Bool, app(app(boolAnd, True), app(app(boolOr, False), True)), True);
export const concreteAndChainProof: Term = refl(Bool, True);
export const concreteOrChainType: Term = eq(Bool, app(app(boolOr, False), app(app(boolAnd, True), False)), False);
export const concreteOrChainProof: Term = refl(Bool, False);

/** Concrete right branches for conjunction and disjunction. */
export const trueAndTrueInputType: Term = eq(Bool, app(app(boolAnd, True), True), True);
export const trueAndTrueInputProof: Term = refl(Bool, True);
export const falseOrFalseInputType: Term = eq(Bool, app(app(boolOr, False), False), False);
export const falseOrFalseInputProof: Term = refl(Bool, False);
