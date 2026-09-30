import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Line2 } from './geometry-line';
import { distanceSq } from './geometry-distance';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

/** A line base can be measured against any point through its distance expression. */
export const lineBaseDistanceType: Term = pi(Line2, pi(Point2,
  eq(Nat, app(app(distanceSq, fst(variable(1))), variable(0)), app(app(distanceSq, fst(variable(1))), variable(0))), 'p'), 'l');
export const lineBaseDistanceProof: Term = lambda(Line2, lambda(Point2, refl(Nat, app(app(distanceSq, fst(variable(1))), variable(0))), 'p'), 'l');

/** Rotating a line base yields a directly usable metric expression. */
export const rotatedLineBaseDistanceType: Term = pi(Line2, pi(Point2,
  eq(Nat, app(app(distanceSq, app(rotate90, fst(variable(1)))), variable(0)), app(app(distanceSq, app(rotate90, fst(variable(1)))), variable(0))), 'p'), 'l');
export const rotatedLineBaseDistanceProof: Term = lambda(Line2, lambda(Point2, refl(Nat, app(app(distanceSq, app(rotate90, fst(variable(1)))), variable(0))), 'p'), 'l');
