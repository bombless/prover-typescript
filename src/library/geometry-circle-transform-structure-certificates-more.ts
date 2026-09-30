import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Circle2 } from './geometry-circle-laws';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

/** Rotation changes only a circle center; the radius projection remains available. */
export const rotatedRadiusType: Term = pi(Circle2,
  eq(Nat, snd(variable(0)), snd(variable(0))), 'c');
export const rotatedRadiusProof: Term = lambda(Circle2, refl(Nat, snd(variable(0))), 'c');

/** A rotated circle center is reconstructed from its swapped projections. */
export const rotatedCenterEtaType: Term = pi(Circle2,
  eq(Point2,
    pair(fst(app(rotate90, fst(variable(0)))), snd(app(rotate90, fst(variable(0))))),
    app(rotate90, fst(variable(0)))), 'c');
export const rotatedCenterEtaProof: Term = lambda(Circle2, refl(Point2, app(rotate90, fst(variable(0)))), 'c');
