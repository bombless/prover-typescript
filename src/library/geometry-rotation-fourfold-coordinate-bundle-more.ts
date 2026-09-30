import { Term, Nat, prod, variable, pi, lambda, eq, refl, fst, snd, pair, app } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);
const twice = (p: Term): Term => app(rotate90, app(rotate90, p));

/** Two quarter-turns preserve both coordinate projections for every point. */
export const rotationTwiceCoordinateBundleType: Term = pi(Point2,
  prod(
    eq(Nat, fst(twice(variable(0))), fst(variable(0))),
    eq(Nat, snd(twice(variable(0))), snd(variable(0)))), 'p');

export const rotationTwiceCoordinateBundleProof: Term = lambda(Point2,
  pair(
    refl(Nat, fst(variable(0))),
    refl(Nat, snd(variable(0)))), 'p');
