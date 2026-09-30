import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { midpoint } from './geometry-segment';

export const Point2: Term = prod(Nat, Nat);

/** Both coordinate projections of the discrete midpoint are available together. */
export const midpointCoordinateBundleType: Term = pi(Point2, pi(Point2,
  prod(
    eq(Nat, fst(app(app(midpoint, variable(1)), variable(0))), fst(variable(1))),
    eq(Nat, snd(app(app(midpoint, variable(1)), variable(0))), snd(variable(0)))), 'q'), 'p');

export const midpointCoordinateBundleProof: Term = lambda(Point2, lambda(Point2,
  pair(
    refl(Nat, fst(variable(1))),
    refl(Nat, snd(variable(0)))), 'q'), 'p');
