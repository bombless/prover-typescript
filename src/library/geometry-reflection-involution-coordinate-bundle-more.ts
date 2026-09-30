import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { reflectX } from './geometry-reflections';

export const Point2: Term = prod(Nat, Nat);
const twice = (p: Term): Term => app(reflectX, app(reflectX, p));

/** Two reflections preserve both coordinates for every point. */
export const reflectionInvolutionCoordinateBundleType: Term = pi(Point2,
  prod(
    eq(Nat, fst(twice(variable(0))), fst(variable(0))),
    eq(Nat, snd(twice(variable(0))), snd(variable(0)))), 'p');

export const reflectionInvolutionCoordinateBundleProof: Term = lambda(Point2,
  pair(
    refl(Nat, fst(variable(0))),
    refl(Nat, snd(variable(0)))), 'p');
