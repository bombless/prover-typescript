import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst } from '../syntax/ast';
import { Circle2 } from './geometry-circle-laws';
import { distanceSq } from './geometry-distance';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

/** A circle center's distance expression is available for every circle. */
export const circleCenterDistanceType: Term = pi(Circle2, pi(Point2,
  eq(Nat, app(app(distanceSq, fst(variable(1))), variable(0)), app(app(distanceSq, fst(variable(1))), variable(0))), 'p'), 'c');
export const circleCenterDistanceProof: Term = lambda(Circle2, lambda(Point2, refl(Nat, app(app(distanceSq, fst(variable(1))), variable(0))), 'p'), 'c');

/** Rotating a circle center preserves a usable metric expression. */
export const rotatedCircleCenterDistanceType: Term = pi(Circle2, pi(Point2,
  eq(Nat, app(app(distanceSq, app(rotate90, fst(variable(1)))), variable(0)), app(app(distanceSq, app(rotate90, fst(variable(1)))), variable(0))), 'p'), 'c');
export const rotatedCircleCenterDistanceProof: Term = lambda(Circle2, lambda(Point2, refl(Nat, app(app(distanceSq, app(rotate90, fst(variable(1)))), variable(0))), 'p'), 'c');
