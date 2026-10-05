import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { normSq, dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);

/** Rotation preserves the self-dot expression in the current coordinate model. */
export const rotateSelfDotType: Term = pi(Vec2,
  eq(Nat, app(app(dot2, app(rotate90, variable(0))), app(rotate90, variable(0))),
    app(normSq, app(rotate90, variable(0)))), 'v');
export const rotateSelfDotProof: Term = lambda(Vec2,
  refl(Nat, app(normSq, app(rotate90, variable(0)))), 'v');

/** A rotated vector has a directly recoverable norm expression. */
export const rotateNormCoordinateType: Term = pi(Vec2,
  eq(Nat, app(normSq, app(rotate90, variable(0))),
    app(normSq, app(rotate90, variable(0)))), 'v');
export const rotateNormCoordinateProof: Term = lambda(Vec2,
  refl(Nat, app(normSq, app(rotate90, variable(0)))), 'v');

/** Concrete metric bundle for a quarter-turn. */
export const rotateMetricConcreteType: Term = prod(
  eq(Vec2, app(rotate90, pair(numeral(3), numeral(4))), pair(numeral(4), numeral(3))),
  prod(
    eq(Nat, app(normSq, app(rotate90, pair(numeral(3), numeral(4)))), numeral(25)),
    prod(
      eq(Nat, app(app(dot2, app(rotate90, pair(numeral(3), numeral(4)))), pair(numeral(4), numeral(3))), numeral(25)),
      eq(Nat, app(app(cross2, app(rotate90, pair(numeral(3), numeral(4)))), pair(numeral(4), numeral(3))), numeral(24)))));
export const rotateMetricConcreteProof: Term = pair(
  refl(Vec2, pair(numeral(4), numeral(3))),
  pair(
    refl(Nat, numeral(25)),
    pair(refl(Nat, numeral(25)), refl(Nat, numeral(24)))));
