import { Term, Nat, prod, variable, pi, lambda, eq, refl, fst, snd, pair, app } from '../syntax/ast';
import { reflectX } from './geometry-reflections';

export const Point2: Term = prod(Nat, Nat);

/** Reflection preserves both coordinate projections for every point. */
export const reflectionCoordinateBundleType: Term = pi(Point2,
  prod(
    eq(Nat, fst(app(reflectX, variable(0))), fst(variable(0))),
    eq(Nat, snd(app(reflectX, variable(0))), snd(variable(0)))), 'p');

export const reflectionCoordinateBundleProof: Term = lambda(Point2,
  pair(
    refl(Nat, fst(variable(0))),
    refl(Nat, snd(variable(0)))), 'p');
