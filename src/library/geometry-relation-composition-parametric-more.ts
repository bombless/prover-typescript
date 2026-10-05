import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { rightAngle } from './geometry-angle';
import { cross2 } from './geometry-cross';
import { dot2 } from './geometry-metrics';

export const Vec2: Term = prod(Nat, Nat);
const zero: Term = pair({ kind: 'Zero' }, { kind: 'Zero' });

/** A parallel certificate is exactly a zero cross equality. */
export const parallelIffCrossZeroType: Term = pi(Vec2, pi(Vec2,
  pi(eq(Nat, app(app(cross2, variable(1)), variable(0)), { kind: 'Zero' }),
    app(app(parallelVec, variable(2)), variable(1)), 'h'), 'v'), 'u');
export const parallelIffCrossZeroProof: Term = lambda(Vec2, lambda(Vec2, lambda(
  eq(Nat, app(app(cross2, variable(1)), variable(0)), { kind: 'Zero' }),
  variable(0), 'h'), 'v'), 'u');

/** A perpendicular certificate is exactly a zero dot equality. */
export const perpendicularIffDotZeroType: Term = pi(Vec2, pi(Vec2,
  pi(eq(Nat, app(app(dot2, variable(1)), variable(0)), { kind: 'Zero' }),
    app(app(perpendicularVec, variable(2)), variable(1)), 'h'), 'v'), 'u');
export const perpendicularIffDotZeroProof: Term = lambda(Vec2, lambda(Vec2, lambda(
  eq(Nat, app(app(dot2, variable(1)), variable(0)), { kind: 'Zero' }),
  variable(0), 'h'), 'v'), 'u');

/** The right-angle predicate has the same zero-dot certificate as perpendicularity. */
export const rightAngleIffDotZeroType: Term = pi(Vec2, pi(Vec2,
  pi(eq(Nat, app(app(dot2, variable(1)), variable(0)), { kind: 'Zero' }),
    app(app(rightAngle, variable(2)), variable(1)), 'h'), 'v'), 'u');
export const rightAngleIffDotZeroProof: Term = lambda(Vec2, lambda(Vec2, lambda(
  eq(Nat, app(app(dot2, variable(1)), variable(0)), { kind: 'Zero' }),
  variable(0), 'h'), 'v'), 'u');

/** All three zero-vector relation certificates compute definitionally. */
export const zeroRelationProductType: Term = pi(Vec2,
  prod(
    app(app(parallelVec, zero), variable(0)),
    prod(app(app(perpendicularVec, zero), variable(0)), app(app(rightAngle, zero), variable(0)))
  ), 'v');
export const zeroRelationProductProof: Term = lambda(Vec2,
  pair(
    refl(Nat, { kind: 'Zero' }),
    pair(refl(Nat, { kind: 'Zero' }), refl(Nat, { kind: 'Zero' }))
  ), 'v');
