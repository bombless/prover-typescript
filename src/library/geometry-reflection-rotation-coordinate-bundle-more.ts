import { Term, Nat, prod, variable, pi, lambda, eq, refl, fst, snd, pair, app } from '../syntax/ast';
import { reflectX } from './geometry-reflections';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

/** Reflection after rotation exposes a swapped coordinate pair. */
export const reflectionRotationCoordinateType: Term = pi(Point2,
  eq(Point2, app(reflectX, app(rotate90, variable(0))),
    pair(snd(variable(0)), fst(variable(0)))), 'p');
export const reflectionRotationCoordinateProof: Term = lambda(Point2,
  refl(Point2, pair(snd(variable(0)), fst(variable(0)))), 'p');
