import { Term, Nat, prod, variable, pi, lambda, eq, refl, fst, snd, pair, app } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

/** A quarter-turn swaps both coordinate projections for every point. */
export const rotationCoordinateBundleType: Term = pi(Point2,
  prod(
    eq(Nat, fst(app(rotate90, variable(0))), snd(variable(0))),
    eq(Nat, snd(app(rotate90, variable(0))), fst(variable(0)))), 'p');

export const rotationCoordinateBundleProof: Term = lambda(Point2,
  pair(
    refl(Nat, snd(variable(0))),
    refl(Nat, fst(variable(0)))), 'p');
